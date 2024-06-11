const User = require('./User');
const Room = require('./Room');

User.hasMany(Room, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Room.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Room };