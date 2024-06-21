import db from "../models/index.js"

const TransparencyMotor = db.TransparencyMotor

/*
  CRUD Functionality
*/

/* Create */
export async function createTransparencyMotor(voxelId) {
  try {
    return await TransparencyMotor.create({ voxelId })
  } catch (error) {
    console.error("Error creating colour motor:", voxelId)
    throw error
  }
}
