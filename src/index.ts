import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import FastifyRateLimit from '@fastify/rate-limit';
import { logger } from './logger';
import { weatherRoutes } from './routes/weather.route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

const startServer = async ({
  port,
  maxRequestPerLimit,
  rateLimitTimeWindow,
}: {
  port: number;
  maxRequestPerLimit: number;
  rateLimitTimeWindow: string;
}) => {
  try {
    await app.register(FastifyRateLimit, {
      max: maxRequestPerLimit,
      timeWindow: rateLimitTimeWindow,
    });

    await app.register(weatherRoutes);

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    await app.listen({ port, host: '0.0.0.0' });
    logger.info(`Server listening on port ${port}`);
  } catch (err) {
    logger.error('Error starting server:', err);
  }
};

export { app, startServer };

if (require.main === module) {
  startServer({
    port: 3333,
    maxRequestPerLimit: 5,
    rateLimitTimeWindow: '10 seconds',
  });
}
