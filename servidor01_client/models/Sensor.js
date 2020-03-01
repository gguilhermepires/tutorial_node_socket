const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Sensor= sequelize.define('sensor', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: Sequelize.STRING,
  topico: Sequelize.STRING,
  broker: Sequelize.STRING,
  porta: Sequelize.STRING,
  empresaId: Sequelize.INTEGER
});

module.exports = Sensor;
