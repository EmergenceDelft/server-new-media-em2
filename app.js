import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"
import watchDatabase from "./services/watchDatabase.js"
import fetchDbRoutes from "./routes/fetchDbRoutes.js"
import db from "./models/index.js" // Assuming this imports your Sequelize models

import {
  updateAllConnections,
  updateModule
} from "./controllers/ModuleController.js"
import { handleMessage } from "./services/messageHandler.js"

var app = express()
var ws = expressWs(app)

app.set("view engine", "ejs")

//Sync database
await sequelize
  //.sync({ force: true })
  .sync()
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })

await db.SensorReading.truncate()

export var clients = []

app.use(function (req, _res, next) {
  req.testing = "testing"
  return next()
})

app.use(fetchDbRoutes)

app.get("/", async (req, res) => {
  res.render("index")
})

app.ws("/echo", async function (ws, req) {
  const time = Date.now()
  clients.push({ ws, time })

  console.log("updated?")
  ws.on("message", async function (msg) {
    try {
      console.log("handling")
      handleMessage(msg, ws)
      console.log("done handling")
      //await updateModule(mac, true)
    } catch (error) {
      console.error("Error parsing or processing message:", error)
    }
  })

  ws.on("close", function () {
    // Remove the WebSocket client from the array when disconnected
    //updateModule(mac, false)
    clients = clients.filter((client) => client.ws !== ws)
  })
})

setInterval(async () => {
  try {
    console.log("setting everything to dead")
    await updateAllConnections(false)
  } catch (err) {
    console.error("Error updating all connections:", err)
  }
}, 10000)

const pollingInterval = 100
setInterval(async () => {
  try {
    const clientsWithoutTime = clients.map(({ ws, time }) => ws)
    console.log("this is my original list of clients")
    watchDatabase(clientsWithoutTime, pollingInterval)
  } catch (err) {
    console.error("Error watching database", err)
  }
}, pollingInterval)

//this runs watching the database every second, and
//then watchDatabase(clients) doesn't have a while true loop anymore
//this is done this way in order to make sure that the clients object is passed to watchDatabase as often as possible
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
