import {
  createModule,
  getModuleByMacAddress
} from "../controllers/ModuleController.js"

import { createSensor } from "../controllers/SensorController.js"

import { createSensorReading } from "../controllers/SensorReadingController.js"

import { createMotor, updateMotor } from "../controllers/MotorController.js"
import { createVoxel } from "../controllers/VoxelController.js"

const MOTOR_AMOUNT = 2
const VOXEL_AMOUNT = 1

export async function handleMessage(msg, ws) {
  try {
    var jsonMsg = JSON.parse(msg)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  switch (jsonMsg.type) {
    /* Initial message sent by the ESP to the server. */
    case "hello":
      handleHelloMessage(jsonMsg, ws)
      break

    case "sensor_reading":
      handleSensorReadingMessage(jsonMsg)
      break
    case "motor_angle":
      handleMotorAngleMessage(jsonMsg)
      break
  }
}

/* Creates a module in the database if it does not yet exist. */
async function handleHelloMessage(msg, ws) {
  ws.mac_address = msg.mac_address

  let moduleOrNull = await getModuleByMacAddress(msg.mac_address)
  console.log(moduleOrNull)
  if (moduleOrNull !== null) {
    console.log(msg.mac_address)
    await createModule(msg.mac_address)

    for (let sensor_type of msg.sensors) {
      await createSensor(sensor_type, msg.mac_address)
    }

    let voxelId = Math.round(Math.random() * 100000).toString()
    await createMotor(voxelId, 0, "TRANSPARENCY", "MANUAL", msg.mac_address)
    await createMotor(voxelId, 1, "COLOR", "AUTO", msg.mac_address)
  }
}

function handleSensorReadingMessage(msg) {
  createSensorReading(msg.sensor_id, msg.value, msg.sensor_type).catch((err) =>
    console.error("Could not create a sensor reading in the database", err)
  )
}

function handleMotorAngleMessage(msg) {
  updateMotor(msg.id, msg.value).catch((err) =>
    console.error("Could not create a sensor reading in the database", err)
  )
}
