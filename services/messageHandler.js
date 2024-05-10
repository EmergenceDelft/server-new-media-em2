import {
  createModule,
  getModuleByMacAddress
} from "../controllers/ModuleController.js"

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
  //Check if the mac address already exists in DB, if not, create a new module
  getModuleByMacAddress(msg.mac_address)
    .then((existingModule) => {
      if (!existingModule) {
        console.log("in here")
        createModule(msg.mac_address)
          .then(console.log("Module created"))
          .catch((err) =>
            console.error("Could not create a module in the database", err)
          )
      } else {
        console.log("Module with MAC address already exists")
      }
    })
    .catch((err) =>
      console.error("Error occurred while checking for module:", err)
    )
}

function handleSensorReadingMessage(msg) {
  console.log(msg)
}
