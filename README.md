# control-new-media-em2


when running app.js, one is able to connect via websockets to localhost:3000/echo
the server keeps track of multiple connections (though disconnecting and reconnecting connections have not yet been tested)

the server sends a message with the current timestamp to every connected client, every 1 second

