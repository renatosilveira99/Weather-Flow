import type { FastifyRequest, FastifyReply } from 'fastify';
import { WeatherRepository } from '../domain/repositories/weather.repository';
import { GetWeatherService } from '../services/get-weather.service';
import { getWeatherValidationSchema } from '../validations/get-weather.validation';
import z from 'zod';

export async function getWeatherController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { city, date } = getWeatherValidationSchema.parse(req.query);

    const weatherService = new GetWeatherService(new WeatherRepository());
    const weather = await weatherService.execute({ city, date });

    return reply.status(200).send(weather);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const { message } = error.errors[0];

      const errorMessage = `${message}`;
      return reply.status(400).send({ error: errorMessage });
    }

    const err = error as Error;

    return reply.status(400).send({ error: err.message });
  }
}
