const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let boardContent = []

io.on("connection", (socket) => {
  console.log("connect:", socket.id);
  // TODO load whiteboard on connection
  socket.emit('loadBoard', boardContent);

  socket.on("draw", (line) => {

    boardContent.push(line)

    socket.broadcast.emit("draw", line)  // send to everyone except the sender
  })

  socket.on("disconnect", () => {
    console.log("disconnect :", socket.id);
  });
});

server.listen(4000, () => {
  console.log("server on");
});