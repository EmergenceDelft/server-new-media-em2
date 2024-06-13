import db from "../models/index.js"

const Entanglement = db.Entanglement
const Module = db.Module

/*
  CRUD Functionality
*/

/* Create */
export async function createEntanglement(mac_addresses) {
  try {
    const modules = mac_addresses.map(async (mac_address) => {
      const module = await Module.findByPk(mac_address)
      if (module === null) {
        /* When no module is found we want to throw an exception, because the input data is invalid */
        throw "ModuleNotFound"
      }
      return module
    })

    const entanglements = []
    for (let i = 0; i < modules.length; i++) {
      for (let j = i + 1; j < modules.length; j++) {
        entanglements.push({
          moduleId: modules[i].id,
          relatedModuleId: modules[j].id
        })
      }
    }

    await Entanglement.bulkCreate(entanglements)
  } catch (error) {
    console.error("Error creating entanglement: ", error)
    throw error
  }
}
