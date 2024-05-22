import db from "../models/index.js"

const Sensor = db.Sensor

// Exports a createModule function which can be used in the app
export async function createSensor(ty, mac) {
  try {
    console.log("this is the type and mac " + ty + " " + mac)
    Sensor.create({
      id: mac + "::" + ty,
      module_mac_address: mac,
      type: ty
    }).then(console.log("Sensor created!"))
  } catch (error) {
    console.log(error)
  }
}
