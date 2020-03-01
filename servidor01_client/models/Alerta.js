const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Alerta = sequelize.define('alerta', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioId: Sequelize.INTEGER,
    sensorId: Sequelize.INTEGER,
    sensorNome: Sequelize.STRING,
	tipoAlerta: Sequelize.STRING,
	dataAlerta: Sequelize.DATE,
    usuarioNome: Sequelize.STRING,
    emailAlerta: Sequelize.STRING,
    telefoneAlerta: Sequelize.STRING,
    valor: Sequelize.STRING,
    valorMax: Sequelize.STRING,
    valorMin: Sequelize.STRING,
});

module.exports = Alerta;