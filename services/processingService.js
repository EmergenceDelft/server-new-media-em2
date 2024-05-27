import db from "../models/index.js" // Assuming this imports your Sequelize models
import sequelize from "../services/db.js"
import { Op } from "sequelize"

const macAddressLength = 17

export async function processDatabaseEntries(newEntries, clients, flip) {
  const updatedMotors = await updateMotors(newEntries, clients, flip)

  if (updatedMotors) {
    const macs = updatedMotors.map((x) =>
      x.dataValues.voxelId.slice(0, macAddressLength)
    )
    console.log(macs)

    //now i want to send to each web socket connection the updated motors that it's interested about
    //do that by matching ws.mac_address with updatedMotors

    for (let i = 0; i < clients.length; i++) {
      const wsi = clients[i]
      const mac_websocket = wsi.mac_address
      const filteredMotorsDegrees = updatedMotors
        .filter(
          (x) =>
            x.dataValues.voxelId.slice(0, macAddressLength) == mac_websocket
        )
        .map((x) => x.dataValues.angle)

      wsi.send(motorsToJson(filteredMotorsDegrees))
    }
  }
}

function motorsToJson(filteredMotors) {
  const jsonMotorsArray = filteredMotors.map((angle, index) => ({
    motor_address: index,
    angle: angle
  }))

  const jsonMotorFinal = {
    type: "motor_commands",
    motors: jsonMotorsArray
  }

  return JSON.stringify(jsonMotorFinal)
}

async function updateMotors(newEntries, clients, flip) {
  const isOverThreshold = newEntries.some((reading) => reading.value > 0.1)
  console.log("threshold?")
  console.log(isOverThreshold)
  let macs = clients.map((client) => client.mac_address)

  console.log(macs)

  const transaction = await sequelize.transaction()
  if (isOverThreshold) {
    try {
      const macConditions = macs.map((mac) => ({
        voxelId: {
          [Op.like]: `%${mac}%`
        }
      }))
      // we can no longer do this since Motors do not have module_mac_address
      // should we do one extra query or add a redundant field into Motor creation

      //try to extract mac from voxel_id

      const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
        { angle: flip ? 90 : 0 }, // Set the angle column to 90
        {
          where: {
            [Op.or]: macConditions
          },
          returning: true,
          transaction
        } // sequelize interprets this as module_mac_address matches at least one value in macs
      )
      await transaction.commit()
      console.log("All motors updated succesfully")
      return affectedRows
    } catch (error) {
      await transaction.rollback()
      console.error("Error updating Motors object:", error)
    }
  } else {
    console.log("No sensor reading is over the threshold.")
  }
}
