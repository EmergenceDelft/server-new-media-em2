import db from "../models/index.js"

const Sensor = db.Sensor

export async function createSensorReading(mac_address, sensor_ty, val) {
  try {
    Sensor.create({
      from_mac: mac_address,
      sensor_type: sensor_ty,
      value: val,
      processed: false
    }).then(console.log("Sensor reading created!"))
  } catch (error) {
    console.log(error)
  }
}
