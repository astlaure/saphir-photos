import { DataTypes, Model } from 'sequelize';
import database from '../database';

class User extends Model {
  id!: number;
  name!: string;
  username!: string;
  password!: string;
  role!: 'admin' | 'client';
  token!: string | null;

  readonly createdAt!: Date;
  readonly updated!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    defaultValue: 'client',
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: database,
  tableName: 'users',
});

export default User;
