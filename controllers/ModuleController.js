import db from "../models/index.js"

const Module = db.Module

/*
  CRUD Functionality
*/

/* Create */
export async function createModule(mac_address) {
  try {
    Module.create({
      id: mac_address,
      connection_alive: true
    }).then(console.log("Module created with mac address " + mac_address))
  } catch (error) {
    console.error("Error creating module:", error)
    throw error
  }
}

/* Read */
export async function readModule(mac_address) {
  try {
    return await Module.findOne({
      where: {
        id: mac_address
      }
    })
  } catch (error) {
    console.error("Error fetching module:", error)
    throw error
  }
}

export async function readModules() {
  try {
    const modules = await Module.findAll()
    return modules
  } catch (error) {
    console.error("Error fetching modules:", error)
    throw error
  }
}

/* Update */
export async function updateModule(mac_address, orientation) {
  try {
    const module = await readModule(mac_address)
    module.orientation = orientation
    await module.save()
  } catch (error) {
    console.error("Error updating module:", error)
    throw error
  }
}

export async function updateModuleConnection(mac_address, connection) {
  try {
    const module = await readModule(mac_address)
    module.connection_alive = connection
    await module.save()
  } catch (error) {
    console.error("Error updating module connection to alive:", error)
    throw error
  }
}

export async function updateAllConnections(isAlive) {
  try {
    await Module.update({ connection_alive: isAlive }, { where: {} })
  } catch (error) {
    console.error("Error updating all connection statuses to alive:", error)
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
