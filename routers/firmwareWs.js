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

  const keepAliveInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send("ping")
      ws.ping("pinged") // Send a ping message
    }
    console.log("pinged");
  }, 10000); // Ping every 30 seconds


  ws.on("message", async function (msg) {
    try {
      handleMessage(msg)
    } catch (error) {
      console.error("Error parsing or processing message:", error)
    }
  })

  ws.on("close", async function () {
    connectionManager.removeConnection(req.query.mac_address)
    clearInterval(keepAliveInterval); // Stop the keep-alive pings when the connection closes

  })
})

export default firmwareWs
