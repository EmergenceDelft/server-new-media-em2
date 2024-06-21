import { Message } from "../classes/Message.js"
import { createColourMotor } from "../controllers/ColourMotorController.js"
import { readEntanglements } from "../controllers/EntanglementController.js"
import { createModule, readModule } from "../controllers/ModuleController.js"
import { createTransparencyMotor } from "../controllers/TransparencyMotorController.js"
import { createVoxel } from "../controllers/VoxelController.js"
import db from "../models/index.js"
import connectionManager from "./connectionManager.js"

export function handleMessage(message) {
  try {
    var jsonMessage = JSON.parse(message)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  console.log(jsonMessage.type)

  switch (jsonMessage.type) {
    /* Initial message sent by the ESP to the server. */
    case "hello":
      handleHelloMessage(jsonMessage)
      break
    case "measured":
      handleModuleMeasured(jsonMessage)
      break
    case "unmeasured":
      handleModuleUnmeasured(jsonMessage)
      break
  }

  async function handleHelloMessage(message) {
    let existingModule = await readModule(message.macAddress)

    if (!existingModule) {
      const transaction = await db.sequelize.transaction()

      try {
        existingModule = await createModule(message.macAddress)
        const voxel = await createVoxel(existingModule.id)
        await createColourMotor(voxel.id)
        await createTransparencyMotor(voxel.id)

        await transaction.commit()

        existingModule = await readModule(message.macAddress)
      } catch (error) {
        console.log("Error creating module: ", error)
        await transaction.rollback()
        throw error
      }
    }

    /* Fetch all voxels along with their associated motors. */
    const voxels = await existingModule.getVoxels({
      include: [db.ColourMotor, db.TransparencyMotor]
    })

    const setupMessageContent = voxels.map((voxel) => ({
      id: voxel.id,
      colourMotor: {
        minAngle: voxel.colour_motor.minAngle,
        maxAngle: voxel.colour_motor.maxAngle,
        rotationIncrement: voxel.colour_motor.rotationIncrement,
        minJitterIncrement: voxel.colour_motor.minJitterIncrement,
        maxJitterIncrement: voxel.colour_motor.maxJitterIncrement
      },
      transparencyMotor: {
        activeAngle: voxel.transparency_motor.activeAngle,
        inactiveAngle: voxel.transparency_motor.inactiveAngle
      }
    }))

    const setupMessage = new Message("setup", setupMessageContent)

    connectionManager.sendMessage(existingModule.id, setupMessage)
  }

  async function handleModuleMeasured(message) {
    const entanglements = await readEntanglements({
      where: {
        moduleId: message.macAddress
      }
    })

    const moduleIds = new Set()
    entanglements.forEach((entanglement) => {
      moduleIds.add(message.macAddress)
      moduleIds.add(entanglement.relatedModuleId)
    })

    const entangledMeasuredMessage = new Message("entangled_measured", {
      currentColourAngle: message.currentColourAngle
    })
    connectionManager.broadcastMessage(
      Array.from(moduleIds),
      entangledMeasuredMessage
    )
  }

  async function handleModuleUnmeasured(message) {
    const entanglements = await readEntanglements({
      where: {
        moduleId: message.macAddress
      }
    })

    const moduleIds = new Set()
    entanglements.forEach((entanglement) => {
      moduleIds.add(message.macAddress)
      moduleIds.add(entanglement.relatedModuleId)
    })

    const entangledMeasuredMessage = new Message("entangled_unmeasured", {})

    connectionManager.broadcastMessage(
      Array.from(moduleIds),
      entangledMeasuredMessage
    )
  }
}
