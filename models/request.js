const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");
const user=require('./user');

class Request extends Model {
}

Request.init({
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type:DataTypes.INTEGER,
        allowNull:false

    },
}, {
    sequelize: db,
    modelName: "Requests"
});


Request.belongsTo(user);
module.exports = Request;