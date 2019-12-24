const { Sequelize, Model, DataTypes } = require('sequelize');
pg = require('pg');

module.exports = new Sequelize('opera', 'postgres', 'postgres', {
    dialect: 'postgres'
});

