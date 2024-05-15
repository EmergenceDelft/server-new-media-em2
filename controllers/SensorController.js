import db from "../models/index.js"

const Sensor = db.Sensor

// Exports a createModule function which can be used in the app
export async function createSensor(type, mac) {
  try {
    Sensor.create({
      id: mac + "//" + type,
      module_mac_address: mac,
      type: type
    }).then(console.log("Sensor created!"))
  } catch (error) {
    console.log(error)
  }
}
