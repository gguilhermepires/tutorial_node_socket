const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ConfiguracaoSensor = sequelize.define('configuracaoSensor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valorMax: Sequelize.DECIMAL,
    valorMin: Sequelize.DECIMAL,
    switch_alerta_status: Sequelize.BOOLEAN,
    switch_email: Sequelize.BOOLEAN,
    switch_whatsapp: Sequelize.BOOLEAN,
    switch_sms: Sequelize.BOOLEAN,
    switch_telefone: Sequelize.BOOLEAN,
    switch_pushNotification: Sequelize.BOOLEAN,
    sensorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = ConfiguracaoSensor;