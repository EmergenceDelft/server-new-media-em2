const MESSAGE_TYPES = {
  HELLO: "hello"
}

function handleMessage(msg) {
  try {
    var msg = JSON.parse(msg)
    msg.type = MESSAGE_TYPES(msg.type)
  } catch (err) {
    console.error("Error in parsing message data.", err)
  }

  // Initial message sent by the ESP to the server.
  if (msg.type == MESSAGE_TYPES.HELLO) {
    createModule({
      mac_adres: msg.mac_adres
    }).then(console.log("Message created"))
  }
}
