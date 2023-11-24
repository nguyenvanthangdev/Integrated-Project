const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Benefit_Plans extends Model {
    static associate(models) {}
  }
  Benefit_Plans.init(
    {
      Plan_Name: DataTypes.STRING(50),
      Deductable: DataTypes.NUMERIC(18, 0),
      Percentage_CoPay: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Benefit_Plans",
      tableName: "Benefit_Plans",
      freezeTableName: true,
    }
  );
  return Benefit_Plans;
};
