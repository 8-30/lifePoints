import dotenv from 'dotenv';
import Server from './source/models/server';

//configurar dotenv
dotenv.config();

const server =new Server

server.listen();
