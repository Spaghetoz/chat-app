require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const initSockets = require("./sockets");

const app = express();
const server = http.createServer(app);

app.use(express.json());

const sequelize = require("./config/db");
const User = require("./models/user.model");

sequelize.sync({ alter: true })
  .then(() => console.log("Syncronized tables"));

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});


const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

initSockets(io)

server.listen(process.env.PORT, () => {
  console.log("server on");
});