const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");
const hall=require('./hall');

class Seats extends Model {
}

Seats.init({
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: db,
    modelName: "Seats"
});


Seats.belongsTo(hall);
module.exports = Seats;