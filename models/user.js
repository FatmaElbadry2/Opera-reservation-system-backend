const {Model, DataTypes} = require('sequelize');
const db = require("../config/database");

class User extends Model {
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    city:{
        type: DataTypes.STRING,
        allowNull:false
    },email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    birthdate:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },gender:{
        type: DataTypes.INTEGER,
        allowNull:false
    
},address:{
        type: DataTypes.STRING,
        allowNull:false
    }

    
}, {
    sequelize: db,
    modelName: "Users"
});

module.exports = User;