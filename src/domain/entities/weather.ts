export interface WeatherProps {
  city: string;
  date: Date;
  temperatureInCelsius?: number;
  temperatureInFahrenheit?: number;
}

export class Weather {
  constructor(
    public readonly city: string,
    public readonly date: Date,
    public readonly temperatureInCelsius: number,
    public readonly temperatureInFahrenheit: number,
  ) {}

  static create({ city, date, temperatureInCelsius, temperatureInFahrenheit }: WeatherProps): Weather {
    let tempC: number | undefined = temperatureInCelsius;
    let tempF: number | undefined = temperatureInFahrenheit;

    if (tempC === undefined && tempF !== undefined) {
      tempC = Weather.fahrenheitToCelsius(tempF);
    }

    if (tempF === undefined && tempC !== undefined) {
      tempF = Weather.celsiusToFahrenheit(tempC);
    }

    if (tempC === undefined || tempF === undefined) {
      throw new Error('Both temperatures could not be determined.');
    }

    if (!Weather.validateTemperatures(tempC, tempF)) {
      throw new Error('The provided temperatures are inconsistent.');
    }

    return new Weather(city, date, tempC, tempF);
  }

  private static fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * (5 / 9);
  }

  private static celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  private static validateTemperatures(celsius: number, fahrenheit: number): boolean {
    const expectedFahrenheit = Weather.celsiusToFahrenheit(celsius);
    const tolerance = 0.05;
    return Math.abs(expectedFahrenheit - fahrenheit) < tolerance;
  }
}
