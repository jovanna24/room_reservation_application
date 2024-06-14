const sequelize = require("../config/connection");
const seedUserData = require("./userData");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully.");

    await seedUserData();
    console.log("User data seeded successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Failed to seed the database:", err);
    process.exit(1);
  }
};

seedAll();

