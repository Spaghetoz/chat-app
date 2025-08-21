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
 
// TODO classe/object board in typescript
let boardContent = []
let userPositions = {}  // { socketId: {x, y} } TODO typescript 
let boardSize = {width: 800, height: 500}

io.on("connection", (socket) => {
  console.log("connect:", socket.id);

  socket.emit('loadBoard', boardContent);
  socket.emit("loadUsersPos", userPositions)

  socket.emit("init", {
    boardContent, userPositions, boardSize
  })
  
  socket.broadcast.emit("userConnection", { userId: socket.id });

  socket.on("draw", (item) => {

    boardContent.push(item)

    socket.broadcast.emit("draw", item)  // send to everyone except the sender
  })

  socket.on("updateUserPos", (pos) => {
    userPositions[socket.id] = pos;
    socket.broadcast.emit("updateUserPos", { userId: socket.id, pos });
  })

  socket.on("disconnect", () => {

    delete userPositions[socket.id];
    socket.broadcast.emit("userDisconnection", { userId: socket.id });

    console.log("disconnect :", socket.id);
  });
});

server.listen(4000, () => {
  console.log("server on");
});