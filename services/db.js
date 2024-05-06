import { Sequelize } from "sequelize";

//Setup for the DB connection
const sequelize = new Sequelize(
  process.env.DB_NAME || "new_media",
  process.env.DB_USER || "nmpr",
  process.env.DB_PASSWORD || "admin",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log("Errs");
  });

export default sequelize