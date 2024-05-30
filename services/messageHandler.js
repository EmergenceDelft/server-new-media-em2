import {
  createModule,
  getModuleByMacAddress
} from "../controllers/ModuleController.js"

import { createSensor } from "../controllers/SensorController.js"

import { createSensorReading } from "../controllers/SensorReadingController.js"

import { createMotor } from "../controllers/MotorController.js"
import { createVoxel } from "../controllers/VoxelController.js"

const MOTOR_AMOUNT = 10
const VOXEL_AMOUNT = 2

export function handleMessage(msg, ws) {
  try {
    var jsonMsg = JSON.parse(msg)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  // Initial message sent by the ESP to the server.
  // Sadly JS does not have native enum support.
  switch (jsonMsg.type) {
    case "hello":
      handleHelloMessage(jsonMsg, ws)
      break

    case "sensor_reading":
      handleSensorReadingMessage(jsonMsg)
      break
  }
}

function handleHelloMessage(msg, ws) {
  //Check if the mac address already exists in DB, if not, create a new module
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
                createMotor(voxelId, 0)
                createMotor(voxelId, 1)
                console.log("2 Motors created")
              })
          }
        })
    }
  })
}

function handleSensorReadingMessage(msg) {
  console.log("value received")
  console.log(msg.value)
  createSensorReading(msg.sensor_id, msg.value, msg.sensor_type)
    .then(console.log("Sensor reading created"))
    .catch((err) =>
      console.error("Could not create a sensor reading in the database", err)
    )
}
