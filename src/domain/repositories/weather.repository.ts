import { prisma } from '../../infrastructure/database/prisma.client';
import { Weather } from '../entities/weather';

export class WeatherRepository {
  async getWeather(props: { city: string; date: string }): Promise<Weather | null> {
    const cachedWeather = await prisma.weatherCache.findFirst({
      where: {
        city: props.city,
        date: props.date,
      },
    });

    if (!cachedWeather) {
      return null;
    }

    const { id, city, date, temperatureInCelsius, temperatureInFahrenheit } = cachedWeather;

    return Weather.create({ id, city, date, temperatureInCelsius, temperatureInFahrenheit });
  }

  async cacheWeather(weather: Weather): Promise<void> {
    await prisma.weatherCache.upsert({
      where: {
        city_date: {
          city: weather.city,
          date: weather.date,
        },
      },
      update: {
        temperatureInCelsius: weather.temperatureInCelsius,
        temperatureInFahrenheit: weather.temperatureInFahrenheit,
      },
      create: {
        city: weather.city,
        date: weather.date,
        temperatureInCelsius: weather.temperatureInCelsius,
        temperatureInFahrenheit: weather.temperatureInFahrenheit,
      },
    });
  }
}
