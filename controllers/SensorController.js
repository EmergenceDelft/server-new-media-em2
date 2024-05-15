import db from "../models/index.js"

const Sensor = db.Sensor

// Exports a createModule function which can be used in the app
export async function createSensor(type, module_id) {
  try {
    Sensor.create({
      type,
      module_id
    }).then(console.log("Sensor created!"))
  } catch (error) {
    console.log(error)
  }
}
