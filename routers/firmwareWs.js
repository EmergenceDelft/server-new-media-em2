import expressWs from "express-ws"
import { handleMessage } from "../services/messageHandler.js"
import express from "express"
import connectionManager from "../services/connectionManager.js"
const firmwareWs = express.Router()
expressWs(firmwareWs)
/* 
  Websocket Functionality 
*/

/* Handles websocket connection and functionality.  */
firmwareWs.ws("/", async function (ws, req) {
  connectionManager.addConnection(req.query.mac_address, ws)

  ws.on("message", async function (msg) {
    try {
      handleMessage(msg)
    } catch (error) {
      console.error("Error parsing or processing message:", error)
    }
  })

  ws.on("close", async function () {
    connectionManager.removeConnection(req.query.mac_address)
  })
})

export default firmwareWs
