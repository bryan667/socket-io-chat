const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 9012;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const users = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send-chat-message", (msg) => {
    io.sockets.emit("chat-message", { name: users[socket.id], msg });
  });

  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    io.sockets.emit("user-connected", name);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
