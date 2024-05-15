import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"
import watchDatabase from "./services/watchDatabase.js"

import {
  updateAllConnections,
  updateModule
} from "./controllers/ModuleController.js"
import { handleMessage } from "./services/messageHandler.js"

var app = express()
var ws = expressWs(app)

//Sync database
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })

var clients = []

app.use(function (req, _res, next) {
  console.log("middleware")
  req.testing = "testing"
  return next()
})

app.get("/", function (req, res) {
  console.log("get route", req.testing)
  res.end()
})

app.ws("/echo", async function (ws, req) {
  console.log("hiiiiiiiiii")
  clients.push(ws)

  //const mac = req.query.mac_address

  //createModuleMacAddress(mac)
  //await updateModule(mac, true)

  console.log("updated?")
  ws.on("message", async function (msg) {
    try {
      console.log("handling")
      handleMessage(msg)
      console.log("done handling")
      //await updateModule(mac, true)
    } catch (error) {
      console.error("Error parsing or processing message:", error)
    }
  })

  ws.on("close", function () {
    // Remove the WebSocket client from the array when disconnected
    //updateModule(mac, false)
    clients = clients.filter((client) => client !== ws)
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

setInterval(async () => {
  try {
    await watchDatabase(clients)
  } catch (err) {
    console.error("Error watching database", err)
  }
}, 1000)
//this runs watching the database every second, and
//then watchDatabase(clients) doesn't have a while true loop anymore
//this is done this way in order to make sure that the clients object is passed to watchDatabase as often as possible
app.listen(3000)
