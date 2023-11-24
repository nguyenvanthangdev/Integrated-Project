const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Personal extends Model {
    static associate(models) {}
  }
  Personal.init(
    {
      First_Name: DataTypes.STRING(50),
      Last_Name: DataTypes.STRING(50),
      City: DataTypes.STRING(50),
      Email: DataTypes.STRING(50),
      Phone_Number: DataTypes.STRING(50),
      Gender: DataTypes.BOOLEAN,
      Shareholder_Status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Personal",
      tableName: "Personal",
      freezeTableName: true,
    }
  );
  return Personal;
};
