import db from "../models/index.js"

const Motor = db.Motor

// Exports a createModule function which can be used in the app
export async function createMotor(voxel_id, cnt) {
  try {
    Motor.create({
      id: voxel_id + "::MOTOR_" + cnt,
      voxelId: voxel_id
    })
  } catch (error) {
    console.log(error)
  }
}
