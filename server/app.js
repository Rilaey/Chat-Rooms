require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

  socket.on("new_chat", (data) => {
    io.emit("new_chat", data);
  });

  socket.on("new_user", (data) => {
    const message = `Welcome to room ${data.room}, ${data.username}!`;
    io.emit("new_chat", { author: "ChatBot", message });
  });

  // listen for user disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(port, () => {
  console.log("server running!");
});
