import {
  createModule,
  getModuleByMacAddress
} from "../controllers/ModuleController.js"

import { createSensor } from "../controllers/SensorController.js"

import { createSensorReading } from "../controllers/SensorReadingController.js"

import { createMotor } from "../controllers/MotorController.js"

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
          .then(console.log(sensor_type + "Sensor created"))
          .catch((err) =>
            console.error("Could not create a sensor in the database", err)
          )
      })

      if (!Number.isInteger(msg.motor_amount) || msg.motor_amount <= 0) {
        throw new Error("Invalid motor amount.")
      }

      for (let i = 0; i < msg.motor_amount; i++) {
        createMotor(msg.mac_address, i)
          .then(console.log(i + "th motor created"))
          .catch((err) => console.error("could not create motor", err))
      }
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
