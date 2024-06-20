import db from "../models/index.js"

const TransparencyMotor = db.TransparencyMotor

/* Create */
export async function createTransparencyMotor(voxelId, transaction = null) {
  try {
    return await TransparencyMotor.create(voxelId, { transaction })
  } catch (error) {
    console.error("Error creating colour motor:", voxelId)
    throw error
  }
}
