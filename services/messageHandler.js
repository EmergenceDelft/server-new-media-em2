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
    // case "hello":
    //   handleHelloMessage(jsonMsg.mac_address)
    //   break
    case "sensor_readings":
      handleSensorReadingMessage(jsonMsg)
      break
  }
}

export function createModuleMacAddress(mac_address) {
  //Check if the mac address already exists in DB, if not, create a new module
  getModuleByMacAddress(mac_address)
    .then((existingModule) => {
      if (!existingModule) {
        console.log("in here")
        createModule(mac_address)
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
  //add to sensor table
  console.log(msg)
}
