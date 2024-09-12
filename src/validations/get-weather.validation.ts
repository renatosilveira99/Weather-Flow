import { z } from 'zod';

export const getWeatherValidationSchema = z.object({
  city: z.string().min(1, 'City name is required'),
  date: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), { message: 'Date must be in ISO8601 format' })
    .refine(
      (date) => {
        const parsedDate = new Date(date);
        const now = new Date();
        return parsedDate <= now;
      },
      { message: 'Date cannot be in the future' },
    ),
});
