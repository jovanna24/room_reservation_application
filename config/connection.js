const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD, 
    DB_NAME='room_reservation_db',
    DB_USER='postgres',
    DB_PASSWORD='Dxsxxd1124!',
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: console.log
    }
  );
}

module.exports = sequelize;