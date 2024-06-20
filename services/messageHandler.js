import { createColourMotor } from "../controllers/ColourMotorController.js"
import { createModule, readModule } from "../controllers/ModuleController.js"
import { createTransparencyMotor } from "../controllers/TransparencyMotorController.js"
import { createVoxel } from "../controllers/VoxelController.js"
import db from "./db.js"

export function handleMessage(message) {
  try {
    var jsonMessage = JSON.parse(message)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  switch (jsonMessage.type) {
    /* Initial message sent by the ESP to the server. */
    case "hello":
      handleHelloMessage(jsonMessage)
      break
  }
}

async function handleHelloMessage(message) {
  const existingModule = await readModule(message.macAddress)

  if (!existingModule) {
    const transaction = await db.sequelize.transaction()

    try {
      const module = await createModule(message.macAddress)
      const voxel = await createVoxel(module.id)
      await createColourMotor(voxel.id)
      await createTransparencyMotor(voxel.id)
    } catch (error) {
      console.log("Error creating module: ", error)
      transaction.rollback()
    }
  }
}
