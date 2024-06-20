import db from "../models/index.js"

const Module = db.Module

/*
  CRUD Functionality
*/

/* Create */
export async function createModule(macAddress) {
  try {
    const module = await Module.create({
      mac_address: macAddress
    })
    console.log(
      "Module created with mac address: " + macAddress + " and id: " + module.id
    )
    return module
  } catch (error) {
    console.error("Error creating module: ", error)
    throw error
  }
}

/* Read */
export async function readModule(macAddress) {
  try {
    return await Module.findByPk(macAddress)
  } catch (error) {
    console.error("Error fetching module:", error)
    throw error
  }
}

export async function readModules() {
  try {
    return await Module.findAll()
  } catch (error) {
    console.error("Error fetching modules:", error)
    throw error
  }
}

/* Update */
export async function updateModule(
  macAddress,
  connection,
  orientation,
  position_x,
  position_y
) {
  try {
    const module = await readModule(macAddress)
    module.connection_alive = connection
    module.orientation = orientation
    module.position_x = position_x
    module.position_y = position_y

    await module.save()
  } catch (error) {
    console.error("Error updating module:", error)
    throw error
  }
}

/* Delete */
export async function deleteModule(mac_address) {
  try {
    const module = await readModule(mac_address)
    if (module) {
      await module.destroy()
      console.log("Module deleted with mac address " + mac_address)
    } else {
      console.log("Module not found with mac address " + mac_address)
    }
  } catch (error) {
    console.error("Error deleting module:", error)
    throw error
  }
}
