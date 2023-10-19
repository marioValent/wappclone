const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
    console.log("New client connected!");

    ws.send("This is a hello message");
});
