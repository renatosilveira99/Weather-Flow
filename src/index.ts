import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { getWeatherController } from './controllers/weather.controller';
import FastifyRateLimit from '@fastify/rate-limit';

const app = fastify().withTypeProvider<ZodTypeProvider>();

const startServer = async ({
  port,
  maxRequestPerLimit,
  rateLimitTimeWindow,
}: { port: number; maxRequestPerLimit: number; rateLimitTimeWindow: string }) => {
  try {
    await app.register(FastifyRateLimit, {
      max: maxRequestPerLimit,
      timeWindow: rateLimitTimeWindow,
    });

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.get('/weather', getWeatherController);

    await app.listen({ port });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

export { app, startServer };

if (require.main === module) {
  startServer({
    port: 3000,
    maxRequestPerLimit: 5,
    rateLimitTimeWindow: '10 seconds',
  });
}
