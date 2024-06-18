import db from "../models/index.js"

const Sensor = db.Sensor

// Exports a createModule function which can be used in the app
export async function createSensor(ty, mac) {
  try {
    Sensor.create({
      id: mac + "::" + ty,
      moduleId: mac,
      type: ty
    })
  } catch (error) {
    console.log(error)
  }
}
