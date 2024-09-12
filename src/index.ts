import { logger } from './logger';
import { app } from './server';

const PORT = 3333;

app
  .listen({ port: 3333 })
  .then(() => {
    logger.info(`Server is running on port ${PORT}!`);
  })
  .catch((error) => {
    logger.error(`Unable to start server: [${error}]`);
    process.exit(1);
  });
