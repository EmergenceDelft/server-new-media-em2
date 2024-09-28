import { Message } from "../classes/Message.js"
import { createColourMotor } from "../controllers/ColourMotorController.js"
import { createModule, readModule, readModules } from "../controllers/ModuleController.js"
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
    case "button_pressed":
      handleButtonPressed(jsonMessage)
      break
  }

  async function handleButtonPressed(message) {
    console.log("[Server] Received a BUTTON PRESSED message from: " + message.macAddress)
    
    const modules = await readModules();
    const moduleIds = new Set()
    modules.forEach((module) => {
      moduleIds.add(module.id)
    })

    const buttonPressedMessage = new Message("button_pressed")
    Array.from(moduleIds).forEach((moduleId) => {
    console.log(`[Server] Broadcasting message to module ID: ${moduleId}`);
      connectionManager.broadcastMessage(
      [moduleId],  // broadcast to individual module
      buttonPressedMessage
      );
    });
  }

  async function handleHelloMessage(message) {
    console.log("[Server] Received a HELLO message from: " + message.macAddress)
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

    const setupMessage = new Message("setup", existingModule)

    connectionManager.sendMessage(existingModule.id, setupMessage)
  }

  async function handleModuleMeasured(message) {
    console.log(
      "[Server] Received a MEASURED message from: " + message.macAddress
    )

    const modules = await readModules();
    const moduleIds = new Set()
    modules.forEach((module) => {
      moduleIds.add(module.id)
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
    console.log(
      "[Server] Received a UNMEASURED message from: " + message.macAddress
    )

    const modules = await readModules();
    const moduleIds = new Set()
    modules.forEach((module) => {
      moduleIds.add(module.id)
    })

    const entangledMeasuredMessage = new Message("entangled_unmeasured", {})

    connectionManager.broadcastMessage(
      Array.from(moduleIds),
      entangledMeasuredMessage
    )
  }
}
