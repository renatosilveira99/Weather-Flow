import z from 'zod';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { getWeatherValidationSchema } from '../validations/get-weather.validation';
import { logger } from '../logger';
import type { GetWeatherService } from '../services/get-weather.service';

export async function getWeatherController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const { city, date } = getWeatherValidationSchema.parse(req.query);

    const weatherService: GetWeatherService = req.server.getWeatherService;
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
