
import pathModule from "path"
import express from "express";
import http from "http";
import { Server } from "socket.io";


export const app = express();
const server = http.createServer(app);

export const io = new Server(server);


app.use(express.static(pathModule.resolve("./public")));

server.listen(80);
