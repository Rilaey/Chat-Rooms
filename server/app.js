const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

// create http server with the express app
const server = require("http").createServer(app);

// create the io instance with the http server and cors setting
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname, "../client/build/index.html"),
    (err) => {
      if(err) {
        res.status(500).json(err)
      }
    }
})

// io events
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new_chat", (data) => {
    io.emit("new_chat", data);
  })

  socket.on("new_user", (data) => {
    const message = `Welcome to room ${data.room}, ${data.username}!`;
    io.emit("new_chat", { author: "ChatBot", message });
  })

  // listen for user disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  })
});

server.listen(port, () => {
  console.log("server running!");
});
