import { logger } from './logger';
import { app } from './server';

app
  .listen({ port: 3000 })
  .then(() => {
    logger.info('Server is running on port 3000!');
  })
  .catch((error) => {
    logger.error(`Unable to start server: [${error}]`);
    process.exit(1);
  });
