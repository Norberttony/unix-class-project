
const fs = require("fs");
const pathModule = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { config } = require("dotenv");

config();

const PIPE_PATH = process.env.PIPE;


export const app = express();
const server = http.createServer(app);

export const io = new Server(server);


fs.createReadStream(PIPE_PATH, { encoding: "utf8" }).on("data", (data) => {
    io.emit("data", data.toString());
});

app.use(express.static(pathModule.resolve("./public")));

server.listen(80);
