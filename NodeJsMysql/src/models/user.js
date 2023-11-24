"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      User_Name: DataTypes.STRING(255),
      Password: DataTypes.TEXT,
      Email: DataTypes.STRING(255),
      Active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
