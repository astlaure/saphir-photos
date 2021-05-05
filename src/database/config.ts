import 'dotenv/config';
import { Options } from 'sequelize';

const config: { [env: string]: Options } = {
  test: {
    storage: ':memory:',
    dialect: 'sqlite',
  },
  development: {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  production: {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
};

export default config;
