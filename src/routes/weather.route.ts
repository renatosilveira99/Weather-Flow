import type { FastifyInstance } from 'fastify';
import { getWeatherDocs } from '../documentation/get-weather.docs';
import { getWeatherController } from '../controllers/weather.controller';

export async function weatherRoutes(app: FastifyInstance) {
  app.get('/weather', { schema: getWeatherDocs }, getWeatherController);
}
