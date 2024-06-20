import expressWs from "express-ws"
import { handleMessage } from "../services/messageHandler.js"
import express from "express"
const firmwareWs = express.Router()
expressWs(firmwareWs)
/* 
  Websocket Functionality 
*/

/* Handles websocket connection and functionality  */
firmwareWs.ws("/", async function (ws) {
  ws.on("message", async function (msg) {
    try {
      handleMessage(msg, ws)
    } catch (error) {
      console.error("Error parsing or processing message:", error)
    }
  })
})

export default firmwareWs
