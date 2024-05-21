import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"
import watchDatabase from "./services/watchDatabase.js"
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
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })

var clients = []

app.use(function (req, _res, next) {
  req.testing = "testing"
  return next()
})

app.get("/", async (req, res) => {
  res.render("index")
})

app.get("/api/fetchConnections", async (req, res) => {
  try {
    const clientInfo = clients.map(({ ws, time }) => ({
      mac: ws.mac_address,
      readyState: ws._readyState,
      connectionTimestamp: time
    }))
    res.json(clientInfo)
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch ws connections" })
  }
})

app.get("/api/fetchSensors", async (req, res) => {
  try {
    const sensors = await db.Sensor.findAll()
    res.json(sensors)
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch ws connections" })
  }
})

app.get("/api/fetchSensorReadings", async (req, res) => {
  try {
    const sensorReadings = await db.SensorReading.findAll({
      attributes: ["sensor_id", "value", "createdAt"],
      order: [["createdAt", "ASC"]]
    })
    res.json(sensorReadings)
  } catch (err) {
    console.error("Error fetching sensor readings:", err)
    res.status(500).send({ error: "Failed to fetch sensor readings" })
  }
})

app.ws("/echo", async function (ws, req) {
  console.log("hiiiiiiiiii")
  const time = Date.now()
  clients.push({ ws, time })

  //const mac = req.query.mac_address

  //createModuleMacAddress(mac)
  //await updateModule(mac, true)

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

const pollingInterval = 1000
setInterval(async () => {
  try {
    const clientsWithoutTime = clients.map(({ ws, time }) => ws)
    await watchDatabase(clientsWithoutTime, pollingInterval)
  } catch (err) {
    console.error("Error watching database", err)
  }
}, pollingInterval)
//this runs watching the database every second, and
//then watchDatabase(clients) doesn't have a while true loop anymore
//this is done this way in order to make sure that the clients object is passed to watchDatabase as often as possible
const PORT = process.env.PORT || 3000

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Failed to sync database:", err)
  })
