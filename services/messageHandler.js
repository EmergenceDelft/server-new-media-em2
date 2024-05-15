import {
  createModule,
  getModuleByMacAddress
} from "../controllers/ModuleController.js"

import { createSensor } from "../controllers/SensorController.js"

import { v4 as uuidv4 } from "uuid"
import { createSensorReading } from "../controllers/SensorReadingController.js"

export function handleMessage(msg) {
  try {
    var jsonMsg = JSON.parse(msg)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  // Initial message sent by the ESP to the server.
  // Sadly JS does not have native enum support.
  switch (jsonMsg.type) {
    case "hello":
      handleHelloMessage(jsonMsg)
      break

    case "sensor_reading":
      handleSensorReadingMessage(jsonMsg)
      break
  }
}

function handleHelloMessage(msg) {
  //Check if the mac address already exists in DB, if not, create a new module
  getModuleByMacAddress(msg.mac_address).then((existingModel) => {
    if (!existingModel) {
      createModule(msg.mac_address)
        .then(console.log("Module created"))
        .catch((err) =>
          console.error("Could not create a module in the database", err)
        )

      msg.sensors.forEach((sensor_type) => {
        createSensor(sensor_type, msg.mac_address)
      })
    }
  })
}

function handleSensorReadingMessage(msg) {
  createSensorReading(msg.sensor_id, msg.value)
    .then(console.log("Module created"))
    .catch((err) =>
      console.error("Could not create a module in the database", err)
    )
}
