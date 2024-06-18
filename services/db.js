import { Sequelize } from "sequelize"

/* Determine environment */
const environment = process.env.NODE_ENV || "development"
let dbName, dbUser, dbPassword, dbHost

if (environment === "production") {
  dbName = process.env.DB_NAME || "new_media"
  dbUser = process.env.DB_USER || "nmpr"
  dbPassword = process.env.DB_PASSWORD || "admin"
  dbHost = process.env.DB_HOST || "postgres"
} else {
  /* Development database configurations */
  dbName = process.env.DB_NAME || "new_media"
  dbUser = process.env.DB_USER || "nmpr"
  dbPassword = process.env.DB_PASSWORD || "admin"
  dbHost = process.env.DB_HOST || "localhost"
}

/* Setup the DB connection */
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres"
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
