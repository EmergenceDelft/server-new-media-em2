const MESSAGE_TYPE = {
  HELLO: "hello",
  SENSOR_READING: "sensor_reading"
}

function handleMessage(msg) {
  try {
    var msg = JSON.parse(msg)
    msg.type = MESSAGE_TYPES(msg.type)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  // Initial message sent by the ESP to the server.
  switch (msg.type) {
    case MESSAGE_TYPE.HELLO:
      handleHelloMessage(msg)
      break
    case MESSAGE_TYPE.SENSOR_READING:
      handleSensorDataMessage(msg)
      break
  }
}

function handleHelloMessage(msg) {
  createModule({
    mac_adres: msg.mac_adres
  })
    .then(console.log("Module created"))
    .catch((err) =>
      console.error("Could not create a module in the database", err)
    )
}

function handleSensorReadingMessage(msg) {}
