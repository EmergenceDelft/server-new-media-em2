/* General imports */
import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"
import cors from "cors"
import bodyParser from "body-parser"

/* Router imports */
import firmwareWs from "./routers/firmwareWs.js"
import moduleApi from "./routers/moduleApi.js"
import entanglementApi from "./routers/entanglementApi.js"

var app = express()
expressWs(app)

/* Sync database */
await sequelize
  .sync({ force: true })
  // .sync()
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })

/* Global api configurations */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
)
app.use(bodyParser.json())

/* Frontend api routers*/
app.use(moduleApi)
app.use(entanglementApi)

/* Firmware web sockets router. Contains the main application code. */
app.use(firmwareWs)

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
