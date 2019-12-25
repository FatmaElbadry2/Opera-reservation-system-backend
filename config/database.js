const { Sequelize, Model, DataTypes } = require('sequelize');
pg = require('pg');

module.exports = new Sequelize('opera', 'postgres', '1234567890', {
    dialect: 'postgres'
});

