"Employee strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {}
  }
  Employee.init(
    {
      idEmployee: DataTypes.INTEGER,
      Last_Name: DataTypes.STRING(45),
      First_Name: DataTypes.STRING(45),
      SSN: DataTypes.DECIMAL(10, 0),
      Pay_Rate: DataTypes.STRING(40),
      PayRates_id: DataTypes.INTEGER,
      Vacation_Days: DataTypes.INTEGER,
      Paid_To_Date: DataTypes.DECIMAL(2, 0),
      Paid_Last_Year: DataTypes.DECIMAL(2, 0),
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
