import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    weatherRepository: IWeatherRepository;
    getWeatherService: GetWeatherService;
  }
}
