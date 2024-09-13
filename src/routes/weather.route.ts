import type { FastifyInstance } from 'fastify';
import { getWeatherController } from '../controllers/weather.controller';

export async function weatherRoutes(app: FastifyInstance) {
  app.get('/weather', getWeatherController);
}
