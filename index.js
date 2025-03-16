
const fs = require("fs");
const pathModule = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { config } = require("dotenv");

config();

const PIPE_PATH = process.env.PIPE;


const app = express();
const server = http.createServer(app);

const io = new Server(server);


function readPipe(){
    console.log("Reading data...");
    fs.createReadStream(PIPE_PATH, { encoding: "utf8" }).on("data", (data) => {
        console.log(data);
        io.emit("data", data);
        setTimeout(readPipe, 1000);
    });
}

app.use(express.static(pathModule.resolve("./public")));

server.listen(8000);

readPipe();