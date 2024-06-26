const User = require('./User');
const Event = require('./Events');
const Room = require('./Room');

User.hasMany(Event, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'events'
});

User.hasMany(Room, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'rooms'
});

// Event model associations
Event.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Event.belongsTo(Room, {
  foreignKey: 'room_id',
  onDelete: 'CASCADE',
  as: 'rooms'
});

// Room model associations
Room.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Room.hasMany(Event, {
  foreignKey: 'room_id',
  as: 'events'
});



module.exports = { User, Event, Room };
