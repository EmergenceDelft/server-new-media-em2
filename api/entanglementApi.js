import express from "express"
import { createEntanglement } from "../controllers/EntanglementController"
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

export default entanglementApi
