const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job_History extends Model {
    static associate(models) {}
  }
  Job_History.init(
    {
      Employee_ID: DataTypes.INTEGER,
      Department: DataTypes.STRING(50),
      Division: DataTypes.STRING(50),
      Start_Date: DataTypes.STRING(50),
      End_Date: DataTypes.STRING(50),
      Job_Category: DataTypes.STRING(50),
      Location: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "Job_History",
      tableName: "Job_History",
      freezeTableName: true,
    }
  );
  return Job_History;
};
