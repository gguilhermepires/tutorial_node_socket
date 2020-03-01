const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ConfiguracaoUsuario = sequelize.define('configuracaoUsuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valorMax: Sequelize.DECIMAL,
    valorMin: Sequelize.DECIMAL,
    emailAlerta: Sequelize.STRING,
    telefoneAlerta: Sequelize.STRING,
    switch_alerta: Sequelize.BOOLEAN,
    switch_email: Sequelize.BOOLEAN,
    switch_whatsapp: Sequelize.BOOLEAN,
    switch_sms: Sequelize.BOOLEAN,
    switch_telefone: Sequelize.BOOLEAN,
    switch_login: Sequelize.BOOLEAN,
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = ConfiguracaoUsuario;