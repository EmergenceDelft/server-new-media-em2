import db from "../models/index.js" // Assuming this imports your Sequelize models

export async function processDatabaseEntries(newEntries, clients) {
  clients.forEach((ws) => {
    if (newEntries.length > 0) {
      ws.send(newEntries.length + " new sensor data")
      // There are new entries
      newEntries.forEach((entry) => {
        const data = entry.dataValues

        ws.send(JSON.stringify(data))
      })
    } else {
      // No new entries
      //ws.send("No new entries found")
    }
  })
}
