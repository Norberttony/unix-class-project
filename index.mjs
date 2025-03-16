
import fs from "fs";
import pathModule from "path"
import express from "express";
import http from "http";
import { Server } from "socket.io";

const PIPE_PATH = "/tmp/sysmon_pipe";


export const app = express();
const server = http.createServer(app);

export const io = new Server(server);


fs.createReadStream(PIPE_PATH, { encoding: "utf8" }).on("data", (data) => {
    io.emit("data", data.toString());
});

app.use(express.static(pathModule.resolve("./public")));

server.listen(80);
