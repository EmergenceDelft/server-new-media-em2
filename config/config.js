const config = {
  development: {
    username: process.env.DB_USER || "nmpr",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "new_media",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER || "nmpr",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME_TEST || "new_media_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
}

export default config
