import db from "../models/index.js"

const Module = db.Module

export async function getModuleByMacAddress(mac_address) {
  try {
    console.log("looking up mac address")
    return await Module.findOne({
      where: {
        mac_address
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// Exports a createModule function which can be used in the app
export async function createModule(mac_address) {
  try {
    Module.create({
      mac_address: mac_address,
      connection_alive: true
    }).then(console.log("Module created!"))
  } catch (error) {
    console.log(error)
  }
}

export async function updateModule(mac_address, connection) {
  try {
    const module = await getModuleByMacAddress(mac_address)
    module.connection_alive = connection
    await module.save()
  } catch (err) {
    console.error("error update connection to alive")
    console.error(err)
  }
}

export async function updateAllConnections(isAlive) {
  try {
    await Module.update({ connection_alive: isAlive }, { where: {} })
    console.log(`Connection alive status updated for module`)
  } catch (error) {
    console.error("Error updating connection status in the database:", error)
  }
}
