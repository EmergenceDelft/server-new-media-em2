import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"

import db from "./models/index.js"

import {
  updateAllConnections,
  updateModule
} from "./controllers/ModuleController.js"
import {
  createModuleMacAddress,
  handleMessage
} from "./services/messageHandler.js"

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

app.use(function (req, res, next) {
  console.log("middleware")
  req.testing = "testing"
  return next()
})

app.get("/", function (req, res, next) {
  console.log("get route", req.testing)
  res.end()
})

app.ws("/echo", function (ws, req) {
  clients.push(ws)

  console.log("i think this is a mac address?")
  const mac = req.query.mac_address
  console.log("hello??")
  console.log(mac)

  createModuleMacAddress(mac)
  updateModule(mac, true)

  ws.on("message", function (msg) {
    handleMessage(msg)
  })

  ws.on("close", function () {
    // Remove the WebSocket client from the array when disconnected
    updateModule(mac, false)
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

app.listen(3000)
