import 'dotenv/config';
import database from './database';
import app from './app';
import logger from './core/logger.util';

const { APP_PORT } = process.env;

(async () => {
  await database.authenticate();
  app.listen(APP_PORT, () => logger.info(`Server started on port ${APP_PORT}.`));
})();
