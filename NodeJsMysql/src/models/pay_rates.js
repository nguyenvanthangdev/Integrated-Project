"Pay_rates strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pay_rates extends Model {
    static associate(models) {}
  }
  Pay_rates.init(
    {
      Pay_Rate_Name: DataTypes.STRING(40),
      Value: DataTypes.DECIMAL(10, 0),
      Tax_Percentage: DataTypes.DECIMAL(10, 0),
      Pay_Type: DataTypes.INTEGER,
      Pay_Amount: DataTypes.DECIMAL(10, 0),
      PT_Level_C: DataTypes.DECIMAL(10, 0),
    },
    {
      sequelize,
      modelName: "Pay_rates",
    }
  );
  return Pay_rates;
};
