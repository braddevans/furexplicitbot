module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('serversSettings', {
    serverID: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    prefix: {
      type: Sequelize.STRING(3),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('serversSettings'),
};
