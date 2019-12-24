const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");
const hall=require('./hall');
const event=require('./event')

class Seats extends Model {
}

Seats.init({
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
        
    }
}, {
    sequelize: db,
    modelName: "Seats"
});


Seats.belongsTo(event);
module.exports = Seats;