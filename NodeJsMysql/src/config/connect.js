const { Sequelize } = require("sequelize");

const sequelizeMysql = new Sequelize("payroll", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
// const sequelizeSqlServer = new Sequelize("HR", "sa", "123456", {
//   host: "LAPTOP-NITRO-5",
//   dialect: "mssql",
//   logging: false,
// });
let connectDB = async () => {
  try {
    try {
      await sequelizeMysql.authenticate();
      console.log("Connection has been established successfully to Mysql.");
    } catch (error) {
      console.error("Unable to connect to the database to Mysql :", error);
    }
    // try {
    //   await sequelizeSqlServer.authenticate();
    //   console.log(
    //     "Connection has been established successfully to Sql Server ."
    //   );
    // } catch (error) {
    //   console.error("Unable to connect to the database to Sql Server :", error);
    // }
  } catch (error) {
    console.error("Unable to connect to the database  :", error);
  }
};
module.exports = connectDB;
