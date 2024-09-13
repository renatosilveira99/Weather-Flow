import z from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { getWeatherValidationSchema } from '../validations/get-weather.validation';
import { logger } from '../logger';
import { GetWeatherService } from '../services/get-weather.service';
import { WeatherRepository } from '../domain/repositories/weather.repository';

export async function getWeatherController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { city, date } = getWeatherValidationSchema.parse(req.query);

    // Tried dependency inversion here, but it broke the test, so this will create a new WeatherRepository every time
    // There is space for improvement here
    const weatherService = new GetWeatherService(new WeatherRepository());

    const weather = await weatherService.execute({ city, date });

    return reply.status(200).send(weather);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];

      let errorMessage = `${message}`;

      if (message === 'Required') {
        errorMessage = 'Missing Required Params';
      }

      logger.error(errorMessage);
      return reply.status(400).send({ error: errorMessage });
    }

    const err = error as Error;
    logger.error(err.message);
    return reply.status(400).send({ error: err.message });
  }
}
