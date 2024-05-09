import db from "../models/index.js"

const Module = db.Module

// Exports a createModule function which can be used in the app
export async function createModule() {
  try {
    Module.create().then(console.log("Module created!"))
  } catch (error) {
    console.log(error)
  }
}

export const updateModule = async () => {}
