import { Weather, type WeatherProps } from './weather';

describe('Weather', () => {
  it('should create an instance with Celsius temperature', () => {
    const props: WeatherProps = {
      city: 'São Paulo',
      date: new Date(),
      temperatureInCelsius: 25,
    };
    const weather = Weather.create(props);
    expect(weather.city).toBe('São Paulo');
    expect(weather.date).toBe(props.date);
    expect(weather.temperatureInCelsius).toBe(25);
    expect(weather.temperatureInFahrenheit).toBeCloseTo(77);
  });

  it('should create an instance with Fahrenheit temperature', () => {
    const props: WeatherProps = {
      city: 'New York',
      date: new Date(),
      temperatureInFahrenheit: 77,
    };
    const weather = Weather.create(props);
    expect(weather.city).toBe('New York');
    expect(weather.date).toBe(props.date);
    expect(weather.temperatureInCelsius).toBeCloseTo(25);
    expect(weather.temperatureInFahrenheit).toBe(77);
  });

  it('should create an instance with both temperatures', () => {
    const props: WeatherProps = {
      city: 'Los Angeles',
      date: new Date(),
      temperatureInCelsius: 20,
      temperatureInFahrenheit: 68,
    };
    const weather = Weather.create(props);
    expect(weather.city).toBe('Los Angeles');
    expect(weather.date).toBe(props.date);
    expect(weather.temperatureInCelsius).toBe(20);
    expect(weather.temperatureInFahrenheit).toBe(68);
  });

  it('should throw an error if neither temperature is provided', () => {
    const props: WeatherProps = {
      city: 'Seattle',
      date: new Date(),
    };
    expect(() => Weather.create(props)).toThrow('Both temperatures could not be determined.');
  });

  it('should throw an error for inconsistent temperatures', () => {
    const props: WeatherProps = {
      city: 'Sydney',
      date: new Date(),
      temperatureInCelsius: 30,
      temperatureInFahrenheit: 80, // Wrong value for 30°C
    };
    expect(() => Weather.create(props)).toThrow('The provided temperatures are inconsistent.');
  });
});
