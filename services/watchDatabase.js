// watchDatabase.js

import db from "../models/index.js" // Assuming this imports your Sequelize models
import { processDatabaseEntries } from "./processingService.js" // Function to process database entries

const processInterval = 5000 // Interval in milliseconds (e.g., 5000 ms = 5 seconds)

// Modify the function to accept the ws object as a parameter
async function watchDatabase(clients) {
  try {
    // Run this indefinitely
    // while (true) {
    const currentTime = new Date()
    const lastSecond = new Date(currentTime - 1000) // Get time 1 second ago

    //Query the database for entries created in the last second
    const newEntries = await db.Sensor.findAll({
      where: {
        createdAt: {
          [db.Sequelize.Op.gt]: lastSecond
        },
        processed: false
      }
    })

    // Process the new entries
    if (newEntries.length > 0) {
      await processDatabaseEntries(newEntries, clients) // Pass ws object to the processing function

      // Update all newEntries and set the 'processed' column to true
      await db.Sensor.update(
        { processed: true },
        {
          where: {
            id: newEntries.map((entry) => entry.id)
          }
        }
      )
    }
  } catch (error) {
    console.error("Error while watching database:", error)
  }
}

// Export the function for external use
export default watchDatabase
