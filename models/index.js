// User model associations
const User = require('./User');
const Event = require('./Event');
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

Event.hasMany(Room, {
  foreignKey: 'event_id',
  onDelete: 'CASCADE',
  as: 'rooms'
});

// Room model associations
Room.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Room.hasMany(Event, {
  foreignKey: 'event_id',
  as: 'event'
});



module.exports = { User, Room, Event };
