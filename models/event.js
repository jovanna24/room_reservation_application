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
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reservation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Event',
  }
);

module.exports = Event;
