# control-new-media-em2

when running app.js, one is able to connect via websockets to localhost:3000/echo
the server keeps track of multiple connections (though disconnecting and reconnecting connections have not yet been tested)

the server sends a message with the current timestamp to every connected client, every 1 second

message structure that server can handle

NR OF VOXELS PER MODULE: 5
5 levels
NR OF MOTORS PER MODULE: 10

//inputs
{
"type": "hello",
"mac_address": "ec:07:9c:99:6c:a9",
"sensors": [
"ULTRASOUND",
"MICROPHONE"
]
}

{
"type": "sensor_reading",
"sensor_type": "ULTRASOUND",
"sensor_id": "ec:07:9c:99:6c:a9::ULTRASOUND",
"value": 0.111
}

{
"type": "sensor_reading",
"sensor_type": "MICROPHONE",
"sensor_id": "ec:07:9c:99:6c:a9::MICROPHONE",
"value": 180
}

//0 motors are transparency, and 1 motors are color motors
//outputs
{
type: "motor_commands"
motors: [
{
motor_address: 0
angle: 90,
movement: null
},
{
address: 1
angle: null,
movement: true
},
]
}
