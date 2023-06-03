const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ENABLED CORS
app.use(cors());

// Created An Http server
const server = http.createServer(app);

//SOCKET IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, resp) => {
  resp.send("Hello");
});

server.listen(3001, () => {
  console.log("Connected to " + 3001);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("chatMessage", (data) => {
    console.log(data);
  });
});
