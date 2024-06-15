const sequelize = require('../config/connection');
const { User, Event, Room } = require('../models');

const { User, Event, Room } = require('../models');

const seedDatabase = async () => {
  await User.bulkCreate([
    { name: 'John Doe', email: 'john@example.com', password: 'password', admin: false },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'password', admin: true },
  ]);

  await Room.bulkCreate([
    { room_number: 101, available_resources: 'Projector, Whiteboard', room_capacity: 50, date_created: new Date() },
    { room_number: 102, available_resources: 'Conference Phone, Whiteboard', room_capacity: 20, date_created: new Date() },
  ]);

  await Event.bulkCreate([
    { host: 'John Doe', contact: 'john@example.com', title: 'Team Meeting', description: 'Monthly team meeting', reservation: new Date(), room_id: 1, created_at: new Date(), updated_at: new Date(), user_id: 1 },
    { host: 'Jane Smith', contact: 'jane@example.com', title: 'Project Kickoff', description: 'Kickoff meeting for the new project', reservation: new Date(), room_id: 2, created_at: new Date(), updated_at: new Date(), user_id: 2 },
  ]);

  console.log('Database seeded!');
};

seedDatabase().catch(error => {
  console.error('Failed to seed database:', error);
});
