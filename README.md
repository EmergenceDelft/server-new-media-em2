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
"ULTRASOUND"
]
}

{
"type": "sensor_reading",
"sensor_id": "ec:07:9c:99:6c:a9::ULTRASOUND",
"value": 0.111
}

//outputs
{
motors: [
{
motor_address: 0
angle: 90
},
{
address: 2
angle: 90
},
]
}
