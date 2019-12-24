const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");

class Hall extends Model {
}

Hall.init({
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    nrows: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ncols: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    }
}, {
    sequelize: db,
    modelName: "Halls"
});



module.exports = Hall;