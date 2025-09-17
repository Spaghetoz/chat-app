const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Successfully connected to Postgres DB !");
  } catch (error) {
    console.error("❌ Impossible to connect to Postgres DB :", error);
  }
}

connectDB();

module.exports = sequelize;