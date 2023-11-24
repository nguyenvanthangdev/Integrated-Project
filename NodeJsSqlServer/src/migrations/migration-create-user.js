module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      User_Name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      Password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      Active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
