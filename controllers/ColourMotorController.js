import db from "../models/index.js"

const ColourMotor = db.ColourMotor

/* Create */
export async function createColourMotor(voxelId) {
  try {
    return await ColourMotor.create({ voxelId })
  } catch (error) {
    console.error("Error creating colour motor:", voxelId)
    throw error
  }
}
