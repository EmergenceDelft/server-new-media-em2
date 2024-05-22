import express from "express"
import db from "../models/index.js"
import { clients } from "../app.js"

const apiRouter = express.Router()

// Fetch WebSocket connections
apiRouter.get("/api/fetchConnections", async (req, res) => {
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

// Fetch sensors
apiRouter.get("/api/fetchSensors", async (req, res) => {
  try {
    const sensors = await db.Sensor.findAll()
    res.json(sensors)
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch sensors" })
  }
})

// Fetch sensor readings
apiRouter.get("/api/fetchSensorReadings", async (req, res) => {
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

export default apiRouter
