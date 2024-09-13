import { Weather } from '../domain/entities/weather';
import type { WeatherRepository } from '../domain/repositories/weather.repository';
import { getWeatherFromAPI } from '../infrastructure/weather.api';
import { logger } from '../logger';
import { capitalizeWords } from '../utils/capitalize-words';
import { normalizeDate } from '../utils/normalize-date';

export class GetWeatherService {
  constructor(private weatherRepository: WeatherRepository) {}

  async execute(params: { city: string; date: string }): Promise<Weather> {
    const normalizedDate = normalizeDate(params.date);
    const formattedCity = capitalizeWords(params.city);

    const cachedWeather = await this.weatherRepository.getWeather({ city: formattedCity, date: normalizedDate });

    if (cachedWeather) return cachedWeather;

    logger.info(`Weather data related to ${formattedCity} on ${params.date} not found. fetching from Weather API...`);

    const weatherApiResponse = await getWeatherFromAPI({
      city: formattedCity,
      date: normalizedDate,
    });

    const weather = Weather.create({
      city: formattedCity,
      date: normalizedDate,
      temperatureInCelsius: weatherApiResponse.celsius,
      temperatureInFahrenheit: weatherApiResponse.fahrenheit,
    });

    await this.weatherRepository.cacheWeather(weather);

    return weather;
  }
}
