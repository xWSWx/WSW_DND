const { Sequelize } = require('sequelize');
const dbConfig = require('./database');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
