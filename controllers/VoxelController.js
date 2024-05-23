import db from "../models/index.js"

const Voxel = db.Voxel

// Exports a createModule function which can be used in the app
export async function createVoxel(mac, cnt) {
  const newId = mac + "::VOXEL_" + cnt
  try {
    await Voxel.create({
      id: newId,
      module_id: mac
    })
    return newId
  } catch (error) {
    console.log(error)
    throw error // Re-throw the error if you want to handle it outside this function
  }
}
