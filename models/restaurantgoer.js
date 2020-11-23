"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class restaurantGoer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.restaurantGoer.hasMany(models.history);
    }
  }
  restaurantGoer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      diningStyle: DataTypes.STRING,
      diet: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "restaurantGoer"
    }
  );
  return restaurantGoer;
};
