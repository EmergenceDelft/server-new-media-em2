import express from "express"
import {
  createEntanglement,
  deleteEntanglement,
  readEntanglements
} from "../controllers/EntanglementController.js"
const entanglementApi = express.Router()

/*
  CRUD Functionality
*/

/* Create */
entanglementApi.post("/api/entanglements", async (req, res) => {
  try {
    const { mac_addresses } = req.body
    await createEntanglement(mac_addresses)
    res.status(201).send({ message: "Entanglement created" })
  } catch (error) {
    res.status(500).send({ error: "Failed to create entanglement" })
  }
})

/* Read */
entanglementApi.get("/api/entanglements", async (req, res) => {
  try {
    let entanglements = await readEntanglements()
    res.status(201).send({ entanglements })
  } catch (error) {
    res.status(500).send({ error: "Failed to create entanglement" })
  }
})

/* Delete */
entanglementApi.delete("/api/entanglements/:id", async (req, res) => {
  try {
    const { id } = req.params
    await deleteEntanglement(id)
    res.status(201).send({ message: "Entanglement created" })
  } catch (error) {
    res.status(500).send({ error: "Failed to create entanglement" })
  }
})

export default entanglementApi
