import { DataTypes, Model } from 'sequelize';
import database from '../database';

class Photo extends Model {
  id!: number;
  url!: string;
  liked!: boolean;
  userId!: number;

  readonly createdAt!: Date;
  readonly updated!: Date;
}

Photo.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  liked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize: database,
  tableName: 'photos',
});

export default Photo;
