const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', 'linux', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;