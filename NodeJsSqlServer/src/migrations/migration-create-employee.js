"employee strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("employees", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idEmployee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Last_Name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      First_Name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      SSN: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
      },
      Pay_Rate: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      PayRates_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Vacation_Days: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      Paid_To_Date: {
        type: Sequelize.DECIMAL(2, 0),
        allowNull: true,
      },
      Paid_Last_Year: {
        type: Sequelize.DECIMAL(2, 0),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("employees");
  },
};
