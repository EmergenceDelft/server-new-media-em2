import db from "../models/index.js"

const SensorReading = db.SensorReading

// Exports a createModule function which can be used in the app
export async function createSensorReading(sensor_id, value) {
  try {
    SensorReading.create({
      sensorId: sensor_id,
      value: value
    }).then(console.log("Sensor readings created!"))
  } catch (error) {
    console.log(error)
  }
}
