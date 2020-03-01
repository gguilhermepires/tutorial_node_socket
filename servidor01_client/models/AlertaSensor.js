const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const AlertaSensor = sequelize.define('alertaSensor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: Sequelize.INTEGER,
    sensorId: Sequelize.INTEGER,   
    dataAlerta: Sequelize.DATE,
	tipoAlerta: Sequelize.STRING,
});

module.exports = AlertaSensor;