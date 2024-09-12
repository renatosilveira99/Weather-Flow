import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { getWeatherController } from './controllers/weather.controller';
import FastifyRateLimit from '@fastify/rate-limit';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(FastifyRateLimit, {
  max: 5,
  timeWindow: '10 seconds',
  cache: 10000,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/weather', getWeatherController);

export { app };
