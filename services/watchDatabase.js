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
    console.log("looking for something with clients" + clients)

    //Query the database for entries created in the last second
    const newEntries = await db.Sensor.findAll({
      where: {
        createdAt: {
          [db.Sequelize.Op.gt]: lastSecond
        }
      }
    })
    console.log("found something at time " + currentTime)
    console.log(newEntries)

    // Process the new entries
    await processDatabaseEntries(newEntries, clients) // Pass ws object to the processing function

    // Wait for the specified interval before checking again
    await new Promise((resolve) => setTimeout(resolve, processInterval))
    //}
  } catch (error) {
    console.error("Error while watching database:", error)
  }
}

// Export the function for external use
export default watchDatabase
