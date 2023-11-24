const { Sequelize } = require("sequelize");

const sequelizeSqlServer = new Sequelize("HR", "sa", "123456", {
  host: "LAPTOP-NITRO-5",
  dialect: "mssql",
  logging: false,
});
let connectDB = async () => {
  try {
    await sequelizeSqlServer.authenticate();
    console.log("Connection has been established successfully to Sql Server .");
  } catch (error) {
    console.error("Unable to connect to the database to Sql Server :", error);
  }
};
module.exports = connectDB;
