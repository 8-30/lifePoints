import dotenv from 'dotenv';
import { Socket } from 'socket.io';
import Server from './source/models/server';

//configurar dotenv
dotenv.config();

const server =new Server
server.io.on("connection", (socket: Socket) => {
    socket.on("send_message", (data: any)=> {
            socket.broadcast.emit("receive_message", data);
            console.log("se conecto");
        })
  });

server.listen();
