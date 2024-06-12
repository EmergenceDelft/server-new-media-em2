import express from "express"
import {
  createModule,
  readModule,
  readModules,
  updateModule
} from "../controllers/ModuleController.js"

const moduleApi = express.Router()

/*
  CRUD Functionality
*/

/* Create */
moduleApi.post("/api/modules", async (req, res) => {
  try {
    const { mac_address } = req.body
    await createModule(mac_address)
    res.status(201).send({ message: "Module created" })
  } catch (error) {
    res.status(500).send({ error: "Failed to create module" })
  }
})

/* Read */
moduleApi.get("/api/modules/:mac_address", async (req, res) => {
  try {
    const { mac_address } = req.params
    const module = await readModule(mac_address)
    if (module) {
      res.json(module)
    } else {
      res.status(404).send({ error: "Module not found" })
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch module" })
  }
})

moduleApi.get("/api/modules", async (req, res) => {
  try {
    const modules = await readModules()
    res.json(modules)
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch modules" })
  }
})

/* Update */
moduleApi.post("/api/modules/:mac_address/edit", async (req, res) => {
  try {
    const { mac_address } = req.params
    // const { orientation, position_x, position_y } = req.body
    console.log(req.body)
    return res.status(400).send(req)

    if (
      position_x === undefined ||
      position_y === undefined ||
      orientation === undefined
    ) {
      return res.status(400).send({ error: "Missing field in post message." })
    }

    await updateModule(mac_address, true, orientation, position_x, position_y)
    res.send({ message: "Module updated" })
  } catch (error) {
    res.status(500).send({ error: "Failed to update module" + error })
  }
})

export default moduleApi
