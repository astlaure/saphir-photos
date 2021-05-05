import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (query: QueryInterface) => {
    await query.createTable('photos', {
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
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  down: async (query: QueryInterface) => {
    await query.dropTable('photos');
  },
};
