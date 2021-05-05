import { Sequelize } from 'sequelize';
import config from './config';

const { NODE_ENV = 'development' } = process.env;

const database = new Sequelize(config[NODE_ENV]);

export default database;
