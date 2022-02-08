const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    catagory_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
