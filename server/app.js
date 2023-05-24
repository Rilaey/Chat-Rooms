const express = require('express')
const cors = require('cors')

const app = express()
const port = 8080;

// middleware
app.use(cors({
    origin: "*"
}))

// start server with express and socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// io
io.on("connection", (socket) => {
    console.log("a user connected")
})

server.listen(port, () => {
    console.log("server running!")
})