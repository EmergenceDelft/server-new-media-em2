import { Sequelize } from "sequelize"

//Setup for the DB connection
const sequelize = new Sequelize(
  process.env.DB_NAME || "new_media",
  process.env.DB_USER || "nmpr",
  process.env.DB_PASSWORD || "admin",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
    // schema: "public"
  }
)

sequelize
  .authenticate({ force: true })
  .then(() => {
    console.log("[Server] Connection to database established successfully.")
  })
  .catch((err) => {
    console.error("%c[Server] Failed to connect to database.")
    console.error(err)
  })

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("[Server] Tables dropped successfully")
  })
  .catch((err) => {
    console.error("%c[Server] Failed to drop tables")
    console.error(err)
  })

export default sequelize
