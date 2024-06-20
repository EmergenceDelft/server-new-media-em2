import db from "../models/index.js"

const Voxel = db.Voxel

/*
  CRUD Functionality
*/

/* Create */
export async function createVoxel(moduleId, transaction = null) {
  try {
    return await Voxel.create(moduleId, { transaction })
  } catch (error) {
    console.error("Error creating voxel:", error)
    throw error
  }
}
