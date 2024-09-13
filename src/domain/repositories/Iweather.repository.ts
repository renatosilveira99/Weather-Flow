import type { Weather } from '../entities/weather';

export interface IWeatherRepository {
  getWeather(props: { city: string; date: string }): Promise<Weather | null>;
  cacheWeather(weather: Weather): Promise<void>;
}
