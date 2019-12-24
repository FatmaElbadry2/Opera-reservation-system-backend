const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");
const hall=require('./hall');

class Events extends Model {
}

Events.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        
    },starttime: {
        type: DataTypes.TIME,
        allowNull: false,
        
    },endtime: {
        type: DataTypes.TIME,
        allowNull: false,       
    },
    poster:{
        type:DataTypes.BLOB,
        allowNull:true
    }
    
}, {
    sequelize: db,
    modelName: "Events"
});

Events.belongsTo(hall);
module.exports = Events;