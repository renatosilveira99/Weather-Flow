import { Weather } from '../domain/entities/weather';
import type { WeatherRepository } from '../domain/repositories/weather.repository';
import { getWeatherFromAPI } from '../infrastructure/weather.api';
import { logger } from '../logger';

export class GetWeatherService {
  constructor(private weatherRepository: WeatherRepository) {}

  async execute(params: { city: string; date: string }): Promise<Weather> {
    const cachedWeather = await this.weatherRepository.getWeather(params);

    if (cachedWeather) return cachedWeather;

    logger.info(`Weather data related to ${params.city} on ${params.date} not found. fetching from Weather API...`);

    const weatherApiResponse = await getWeatherFromAPI(params);

    const weather = Weather.create({
      city: params.city,
      date: params.date,
      temperatureInCelsius: weatherApiResponse.celsius,
      temperatureInFahrenheit: weatherApiResponse.fahrenheit,
    });

    await this.weatherRepository.cacheWeather(weather);

    return weather;
  }
}
