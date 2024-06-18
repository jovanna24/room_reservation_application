const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming title is required
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Allow null for description
    },
    reservation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'room',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Add timestamps (createdAt, updatedAt)
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
