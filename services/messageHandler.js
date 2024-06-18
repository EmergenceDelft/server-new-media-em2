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

export function handleMessage(msg, ws) {
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

function handleHelloMessage(msg, ws) {
  /* Creates a module in the database if it does not yet exist. */
  ws.mac_address = msg.mac_address
  getModuleByMacAddress(msg.mac_address).then((existingModel) => {
    if (!existingModel) {
      createModule(msg.mac_address)
        .then(console.log("Module created"))
        .then(() =>
          msg.sensors.forEach((sensor_type) => {
            createSensor(sensor_type, msg.mac_address)
              .then(console.log(sensor_type + "Sensor created"))
              .catch((err) =>
                console.error("Could not create a sensor in the database", err)
              )
          })
        )
        .then(() => {
          for (let i = 0; i < VOXEL_AMOUNT; i++) {
            createVoxel(msg.mac_address, i)
              .then(console.log("Voxel created"))
              .then((voxelId) => {
                createMotor(
                  voxelId,
                  0,
                  "TRANSPARENCY",
                  "MANUAL",
                  msg.mac_address
                )
                createMotor(voxelId, 1, "COLOR", "AUTO", msg.mac_address)
                console.log("2 Motors created")
              })
          }
        })
    }
  })
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
