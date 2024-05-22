import db from "../models/index.js"

const Motor = db.Motor

// Exports a createModule function which can be used in the app
export async function createMotor(mac, cnt) {
  try {
    Motor.create({
      id: mac + "::" + cnt,
      module_mac_address: mac
    })
  } catch (error) {
    console.log(error)
  }
}
