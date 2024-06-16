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
      user_id: {
        type: DataTypes.INTEGER, 
        references: {
          model: 'Users', 
          key: 'id'
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reservation: {
      type: DataTypes.DATE,
      allowNull: false,
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
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);
Event.associate = function(models) {
  Event.belongsTo(models.User, { as: 'user' });
};

module.exports = Event;
