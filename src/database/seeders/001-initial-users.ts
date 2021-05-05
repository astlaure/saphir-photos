import 'dotenv/config';
import { QueryInterface } from 'sequelize';
import BcryptUtil from '../../auth/local/bcrypt.util';

const { INITIAL_USER, INITIAL_PASSWORD } = process.env;

export default {
  up: async (query: QueryInterface) => {
    await query.bulkInsert('users', [
      {
        name: 'Initial User',
        username: INITIAL_USER,
        password: await BcryptUtil.hash(INITIAL_PASSWORD!),
        role: 'admin',
      }
    ])
  },
  down: async (query: QueryInterface) => {
    await query.bulkDelete('users', {});
  },
}
