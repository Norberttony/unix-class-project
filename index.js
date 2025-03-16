
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


(async () => {
    while (true){
        fs.createReadStream(PIPE_PATH, { encoding: "utf8" }).on("data", (data) => {
            console.log(data);
            io.emit("data", data);
        });
        await new Promise(res => setTimeout(res, 500));
    }
})();

app.use(express.static(pathModule.resolve("./public")));

server.listen(80);
