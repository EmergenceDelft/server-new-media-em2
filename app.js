import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"
import watchDatabase from "./services/watchDatabase.js"
import fetchDbRoutes from "./api/fetchDbRoutes.js"
import moduleApi from "./api/moduleApi.js"
import entanglementApi from "./api/entanglementApi.js"
import cors from "cors"
import bodyParser from "body-parser"

import db from "./models/index.js" // Assuming this imports your Sequelize models

import { updateAllConnections } from "./controllers/ModuleController.js"
import { handleMessage } from "./services/messageHandler.js"

var app = express()
var ws = expressWs(app)

//Sync database
await sequelize
  .sync({ force: true })
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })

export var clients = []

/* Global api configurations */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
)
app.use(bodyParser.json())

/* Frontend api routers*/
app.use(fetchDbRoutes)
app.use(moduleApi)
app.use(entanglementApi)

/* Web sockets router. Contains the main application code. */


app.ws("/", async function (ws, req) {
  const time = Date.now()
  clients.push({ ws, time })

  ws.on("message", async function (msg) {
    try {
      handleMessage(msg, ws)
    } catch (error) {
      console.error("Error parsing or processing message:", error)
    }
  })

  ws.on("close", function () {
    clients = clients.filter((client) => client.ws !== ws)
  })
})

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
