import { getWeatherValidationSchema } from './get-weather.validation';

describe('getWeatherValidationSchema', () => {
  it('should reject future dates with time considered', () => {
    const result = getWeatherValidationSchema.safeParse({
      city: 'São Paulo',
      date: new Date(Date.now() + 60 * 1000).toISOString(), // 1 minute in the future
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Date cannot be in the future');
  });

  it('should accept the current date and time', () => {
    const result = getWeatherValidationSchema.safeParse({
      city: 'São Paulo',
      date: new Date().toISOString(), // Current moment
    });
    expect(result.success).toBe(true);
  });

  it('should accept valid past dates with time', () => {
    const result = getWeatherValidationSchema.safeParse({
      city: 'São Paulo',
      date: new Date(Date.now() - 60000 * 1000).toISOString(), // 1 minute in the past
    });
    expect(result.success).toBe(true);
  });
});
