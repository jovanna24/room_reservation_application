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
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW
        }, 
        user_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'user', 
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'event', 
                key: 'id'
            }
        }

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