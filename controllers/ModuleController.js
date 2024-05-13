import db from "../models/index.js"

const Module = db.Module

export async function getModuleByMacAddress(mac_address) {
  try {
    return Module.findOne({
      where: {
        mac_address
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// Exports a createModule function which can be used in the app
export async function createModule(id, mac_address) {
  try {
    Module.create({
      id,
      mac_address
    }).then(console.log("Module created!"))
  } catch (error) {
    console.log(error)
  }
}

export const updateModule = async () => {}
