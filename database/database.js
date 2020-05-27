const Sequelize = require('sequelize');

const connection = new Sequelize('prDB', 'root', 'zmtprfqo', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;