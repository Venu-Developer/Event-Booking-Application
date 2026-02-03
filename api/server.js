import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // load .env

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
