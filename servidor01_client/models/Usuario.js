const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    telefone: Sequelize.STRING,
    email: Sequelize.STRING,
    senha: Sequelize.STRING,
    tokenFirebase: Sequelize.STRING
});

module.exports = Usuario;