const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection'); 
const { timeStamp } = require('console');

class Room extends Model {} 

Room.init(
    {
        id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true,
        }, 
        room_number: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
        }, 
        available_resources: {
            type: DataTypes.STRING, 
        },
        room_capacity: {
            type: DataTypes.NUMBER, 
            allowNull: false,
        },
    }, 
    {
        sequelize, 
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName:'room',
    }
); 

module.exports = Room;