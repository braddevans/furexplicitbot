/* eslint-disable no-undef */
const Sequelize = require('sequelize');

module.exports = sequelize.define('serverSettings', {
  serverID: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  prefix: {
    type: Sequelize.STRING(3),
    allowNull: false,
  },
});