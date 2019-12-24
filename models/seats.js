const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");
const hall=require('./hall');

class Seats extends Model {
}

Seats.init({
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
}, {
    sequelize: db,
    modelName: "Seats"
});


Seats.belongsTo(hall);
module.exports = Seats;