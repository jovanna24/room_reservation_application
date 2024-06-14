const User = require('./User');
const Event = require('./Event');
const Room = require('./Room');

User.hasMany(Room, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', 
  as: 'rooms'
});

Room.belongsTo(User, {
  foreignKey: 'user_id'
});

Room.hasMany(Event, {
  foreignKey: 'room_id', 
  onDelete: 'CASCADE', 
  as: 'event_room'
}); 

Event.belongsTo(Room, {
  foreignKey: 'room_id'
}) 

Event.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Event, {
  foreignKey: 'user_id', 
  onDelete: 'CASCADE',
  as: 'user_event'
})

module.exports = { User, Room, Event };