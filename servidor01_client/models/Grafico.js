const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Grafico = sequelize.define('grafico', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: Sequelize.INTEGER,
    sensorId: Sequelize.INTEGER,
    tipo: Sequelize.STRING,
});
module.exports = Grafico;