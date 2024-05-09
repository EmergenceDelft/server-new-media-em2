import { createModule } from "../controllers/ModuleController.js"

export function handleMessage(msg) {
  try {
    var jsonMsg = JSON.parse(msg)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  // Initial message sent by the ESP to the server.
  // Sadly JS does not have native enum support.
  switch (jsonMsg.type) {
    case "hello":
      handleHelloMessage(jsonMsg)
      break
    case "sensor_readings":
      handleSensorReadingMessage(jsonMsg)
      break
  }
}

function handleHelloMessage(msg) {
  createModule({
    mac_address: msg.mac_address
  })
    .then(console.log("Module created"))
    .catch((err) =>
      console.error("Could not create a module in the database", err)
    )
}

function handleSensorReadingMessage() {}
