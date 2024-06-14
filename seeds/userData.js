const { User } = require('../models');

const userData = [
  {
    name: 'Test User 1',
    email: 'testuser1@example.com',
    password: 'password123',
  },
  {
    name: 'Test User 2',
    email: 'testuser2@example.com',
    password: 'password123',
  },
  // Add more user data as needed
];

const seedUserData = async () => {
  for (const user of userData) {
    await User.create(user);
  }
};

module.exports = seedUserData;

