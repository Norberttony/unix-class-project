
const fs = require("fs");
const pathModule = require("path");
const express = require("express");
const http = require("http");
const net = require("net");
const { Server } = require("socket.io");
const { config } = require("dotenv");

config();

const PIPE_PATH = process.env.PIPE;


const app = express();
const server = http.createServer(app);

const io = new Server(server);


fs.open(PIPE_PATH, fs.constants.O_RDONLY | fs.constants.O_NONBLOCK, (err, fd) => {
    if (err)
        throw new Error(err);
    const pipe = new net.Socket({ fd });
    pipe.on("data", (data) => {
        io.emit("data", data.toString());
    });
});

app.use(express.static(pathModule.resolve("./public")));

server.listen(80);
