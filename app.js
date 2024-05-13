import express from "express"
import expressWs from "express-ws"
import sequelize from "./services/db.js"
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

app.ws("/echo", function (ws) {
  clients.push(ws)

  ws.on("message", function (msg) {
    handleMessage(msg)
  })

  ws.on("close", function () {
    // Remove the WebSocket client from the array when disconnected
    clients = clients.filter((client) => client !== ws)
  })
})

app.listen(3000)
