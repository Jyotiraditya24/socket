import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

// express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ENABLED CORS
app.use(cors());

// Created an HTTP server
const server = http.createServer(app);

// SOCKET IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(3001, () => {
      console.log("Connected to port " + 3001);
    });
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

//   ROUTES
app.use("/auth", authRoutes);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.emit("chat", data);
  });
});
