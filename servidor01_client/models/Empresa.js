const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Empresa= sequelize.define('empresa', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = Empresa;
