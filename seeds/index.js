const sequelize = require('../config/connection');
const { User, Event, Room } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json'); 
const roomData = require('./roomData.json')

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced!');

        const users = await User.bulkCreate(userData, {
            individualHooks: true, 
            returning: true,
        }); 
        console.log('Users seeded!');

        const rooms = await Promise.all(
            roomData.map(async (room) => {
               return Room.create({
                ...room,
                user_id: users[Math.floor(Math.random()* users.length)].id,
               });
            })
        );
        console.log('Rooms seeded!'); 

        const events = await Promise.all(
            eventData.map(async (event) => {
                const createdEvent = await Event.create({
                    ...event, 
                    user_id: users[Math.floor(Math.random() * users.length)].id,
                    room_id: rooms[Math.floor(Math.random() * rooms.length)].id,
                });
                return createdEvent;
            })
        );
        console.log('Events seeded!');
        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Failed to seed database: ', err);
    } 
    process.exit(0);
};

seedDatabase();