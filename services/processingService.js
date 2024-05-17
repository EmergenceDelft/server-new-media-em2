import db from "../models/index.js" // Assuming this imports your Sequelize models
import sequelize from "../services/db.js"

export async function processDatabaseEntries(newEntries, clients, flip) {
  const updatedMotors = await updateMotors(newEntries, clients, flip)
  //json.stringify(updatedMotors)??
  //how to get updated motors
  //console.log(updatedMotors)

  const macs = updatedMotors.map((x) => x.dataValues.module_mac_address)
  console.log(macs)

  //now i want to send to each web socket connection the updated motors that it's interested about
  //do that by matching ws.mac_address with updatedMotors

  for (let i = 0; i < clients.length; i++) {
    const wsi = clients[i]
    const mac_websocket = wsi.mac_address
    const filteredMotorsDegrees = updatedMotors
      .filter((x) => x.dataValues.module_mac_address == mac_websocket)
      .map((x) => x.dataValues.angle)
    wsi.send(JSON.stringify(filteredMotorsDegrees))
  }
}

async function updateMotors(newEntries, clients, flip) {
  const isOverThreshold = newEntries.some((reading) => reading.value > 0.1)
  console.log(isOverThreshold)
  console.log("these are the clients ", clients)
  let macs = clients.map((client) => client.mac_address)
  console.log(macs)

  const transaction = await sequelize.transaction()
  if (isOverThreshold) {
    try {
      // Create or update the Motor object with an angle of 90 degrees
      const [numberOfAffectedRows, affectedRows] = await db.Motor.update(
        { angle: flip ? 90 : 0 }, // Set the angle column to 90
        {
          where: {
            module_mac_address: macs
          },
          returning: true,
          transaction
        } // sequelize interprets this as module_mac_address matches at least one value in macs
      )
      await transaction.commit()
      console.log("All motors updated succesfully")
      console.log("updated rows: ", affectedRows)
      return affectedRows
    } catch (error) {
      await transaction.rollback()
      console.error("Error updating Motors object:", error)
    }
  } else {
    console.log("No sensor reading is over the threshold.")
  }
}
