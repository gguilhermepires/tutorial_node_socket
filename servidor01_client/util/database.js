const Sequelize = require('sequelize');

//const sequelize = new Sequelize('projeto_mspiot', 'root', '', {
    const sequelize = new Sequelize('projeto_MSPIOT',  'dev', 'cls@iot', {
dialect: 'mysql',
   // host: 'localhost',
 //  host: '10.3.3.2',
   host: 'iot.clsinfo.com.br',
 
    logging: false
});

module.exports = sequelize;