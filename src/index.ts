import 'dotenv/config';
import database from './database';
import app from './app';

(async () => {
  await database.authenticate();
  app.listen(3000);
})()
