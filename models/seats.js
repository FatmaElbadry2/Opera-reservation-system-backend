const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");
const hall=require('./hall');
const event=require('./event');
const user=require('./user');

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


Seats.belongsTo(event,{onDelete:'CASCADE'});
Seats.belongsTo(user);
module.exports = Seats;