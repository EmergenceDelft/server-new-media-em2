import db from "../models/index.js"

const Motor = db.Motor

// Exports a createModule function which can be used in the app
export async function createMotor(voxel_id, cnt, ty, movement, mac) {
  try {
    Motor.create({
      id: voxel_id + "::MOTOR_" + cnt,
      voxelId: voxel_id,
      type: ty,
      mac: mac,
      movement: movement
    })
  } catch (error) {
    console.log(error)
  }
}
