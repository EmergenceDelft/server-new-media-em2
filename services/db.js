import { Sequelize } from "sequelize"

// Determine environment
const environment = process.env.NODE_ENV || "development"
let dbName, dbUser, dbPassword, dbHost

if (environment === "production") {
  dbName = process.env.PROD_DB_NAME || "new_media_production"
  dbUser = process.env.PROD_DB_USER || "nmpr"
  dbPassword = process.env.PROD_DB_PASSWORD || "admin"
  dbHost = process.env.PROD_DB_HOST || "localhost"
} else {
  // Development database configurations
  dbName = process.env.DB_NAME || "new_media"
  dbUser = process.env.DB_USER || "nmpr"
  dbPassword = process.env.DB_PASSWORD || "admin"
  dbHost = process.env.DB_HOST || "localhost"
}

// Setup for the DB connection
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres"
  // schema: "public"
})

sequelize
  .authenticate()
  .then(() => {
    console.log("[Server] Connection to database established successfully.")
  })
  .catch((err) => {
    console.error("%c[Server] Failed to connect to database.")
    console.error(err)
  })

export default sequelize
