"specialties strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pay_rates", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Pay_Rate_Name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      Value: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
      },
      Tax_Percentage: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
      },
      Pay_Type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Pay_Amount: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
      },
      PT_Level_C: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pay_rates");
  },
};
