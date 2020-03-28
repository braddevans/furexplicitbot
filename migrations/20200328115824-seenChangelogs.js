module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('seenChangelogs', {
    userID: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('seenChangelogs'),
};