const express = require("express");

const app = express();
const port = 8080;

// create http server with the express app
const server = require("http").createServer(app);

// create the io instance with the http server and cors setting
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

// io events
io.on("connection", (socket) => {
  console.log("a user connected");

  // listen for user disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  })
});

server.listen(port, () => {
  console.log("server running!");
});
