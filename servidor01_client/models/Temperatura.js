const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Temperatura = sequelize.define('temperatura', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor: Sequelize.DECIMAL,
    empresaId:Sequelize.INTEGER,
    sensorId:Sequelize.INTEGER
});

module.exports = Temperatura;