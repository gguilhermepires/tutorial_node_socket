const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ContatoAlertaSensor = sequelize.define('contatoAlertaSensor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: Sequelize.INTEGER,
    sensorId: Sequelize.INTEGER,
    emailAlerta: Sequelize.STRING,
    telefoneAlerta: Sequelize.STRING
});

module.exports = ContatoAlertaSensor;