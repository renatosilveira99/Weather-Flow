import request from 'supertest';
import { startServer, app } from '../..';

describe('Weather Controller E2E Tests', () => {
  beforeAll(async () => {
    await startServer({
      port: 3002,
      maxRequestPerLimit: 10000,
      rateLimitTimeWindow: '10 minutes',
    });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch weather data for a valid city and date', async () => {
    const city = 'New York';
    const date = '2023-09-01';

    const res = await request(app.server).get(`/weather?city=${city}&date=${date}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('city', city);
    expect(res.body).toHaveProperty('date', date);
    expect(res.body).toHaveProperty('temperatureInCelsius');
    expect(res.body).toHaveProperty('temperatureInFahrenheit');
  });

  it('should return 400 if the date is in the future', async () => {
    const city = 'New York';
    const futureDate = '2050-01-02';

    const res = await request(app.server).get(`/weather?city=${city}&date=${futureDate}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Date cannot be in the future');
  });

  it('should return cached data if available', async () => {
    const city = 'New York';
    const date = '2023-09-03';

    await request(app.server).get(`/weather?city=${city}&date=${date}`);

    const res = await request(app.server).get(`/weather?city=${city}&date=${date}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('city', city);
    expect(res.body).toHaveProperty('date', date);
    expect(res.body).toHaveProperty('temperatureInCelsius');
    expect(res.body).toHaveProperty('temperatureInFahrenheit');
  });

  it('should convert temperature to Celsius correctly', async () => {
    const city = 'Tokyo';
    const date = '2023-09-04';

    const res = await request(app.server).get(`/weather?city=${city}&date=${date}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('temperatureInCelsius');
    expect(res.body).toHaveProperty('temperatureInFahrenheit');

    const { temperatureInCelsius, temperatureInFahrenheit } = res.body;
    expect(temperatureInFahrenheit).toBeCloseTo((temperatureInCelsius * 9) / 5 + 32, 1);
  });

  it('should convert temperature to Fahrenheit correctly', async () => {
    const city = 'Tokyo';
    const date = '2023-09-05';

    const res = await request(app.server).get(`/weather?city=${city}&date=${date}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('temperatureInCelsius');
    expect(res.body).toHaveProperty('temperatureInFahrenheit');

    const { temperatureInCelsius, temperatureInFahrenheit } = res.body;
    expect(temperatureInCelsius).toBeCloseTo(((temperatureInFahrenheit - 32) * 5) / 9, 1);
  });
});
