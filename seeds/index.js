const sequelize = require("../configure/connection");
const seedUserData = require("./userData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUserData();

  process.exit(0);
};

seedAll();
