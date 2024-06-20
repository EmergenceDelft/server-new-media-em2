import db from "../models/index.js"

const ColourMotor = db.ColourMotor

/* Create */
export async function createColourMotor(voxelId, transaction = null) {
  try {
    return await ColourMotor.create(voxelId, { transaction })
  } catch (error) {
    console.error("Error creating colour motor:", voxelId)
    throw error
  }
}
