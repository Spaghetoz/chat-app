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

io.on("connection", (socket) => {
  console.log("connect:", socket.id);

  socket.on("draw", (data) => {
    console.log(data)
    io.emit("draw", data)
  })

  socket.on("disconnect", () => {
    console.log("disconnect :", socket.id);
  });
});

server.listen(4000, () => {
  console.log("server on");
});