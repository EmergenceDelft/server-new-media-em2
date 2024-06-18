import db from "../models/index.js"

const Sensor = db.Sensor

export async function createSensor(ty, mac) {
  try {
    await Sensor.create({
      id: mac + "::" + ty,
      moduleId: mac,
      type: ty
    })
  } catch (error) {
    console.log(error)
  }
}
