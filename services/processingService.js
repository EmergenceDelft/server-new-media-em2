import db from "../models/index.js" // Assuming this imports your Sequelize models

export async function processDatabaseEntries(newEntries, clients, flip) {
  // clients.forEach((ws) => {
  //   if (newEntries.length > 0) {
  //     ws.send(newEntries.length + " new sensor data")
  //     console.log(newEntries.length + " new sensor data")
  //     // There are new entries
  //     newEntries.forEach((entry) => {
  //       const data = entry.dataValues

  //       ws.send(JSON.stringify(data))
  //     })
  //   } else {
  //     // No new entries
  //     //ws.send("No new entries found")
  //   }
  // })

  // const isOverThreshold = newEntries.some((reading) => reading.value > 0.5)
  // console.log(isOverThreshold)

  // if (isOverThreshold) {
  //   try {
  //     // Create or update the Motor object with an angle of 90 degrees
  //     await db.Motor.update(
  //       { angle: 90 }, // Set the angle column to 90
  //       { where: {} } // Condition to update all rows (no specific condition)
  //     )

  //     console.log("All motors updated succesfully")
  //   } catch (error) {
  //     console.error("Error updating Motors object:", error)
  //   }
  // } else {
  //   console.log("No sensor reading is over the threshold.")
  // }

  // const updatedMotors = await db.Motor.findAll()
  // const jsonData = JSON.stringify(updatedMotors)
  // clients.forEach((ws) => {
  //   if (newEntries.length > 0) {
  //     ws.send(jsonData)
  //   }
  // })

  const isOverThreshold = newEntries.some((reading) => reading.value > 10)
  console.log(isOverThreshold)

  if (isOverThreshold) {
    for (let i = 0; i < clients.length; i++) {
      const wsi = clients[i]
      wsi.send(flip ? 90 : 0)
    }
  }
}
