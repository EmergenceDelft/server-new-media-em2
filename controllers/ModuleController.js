import db from "../models/index.js"

const Module = db.Module

// Exports a createModule function which can be used in the app
export async function createModule(mac_address) {
  try {
    Module.create({
      mac_address: mac_address
    }).then(console.log("Module created!"))
  } catch (error) {
    console.log(error)
  }
}

export const updateModule = async () => {}
