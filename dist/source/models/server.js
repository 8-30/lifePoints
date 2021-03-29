"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const administrador_routes_1 = __importDefault(require("../routes/administrador.routes"));
const empleado_routes_1 = __importDefault(require("../routes/empleado.routes"));
const insumo_routes_1 = __importDefault(require("../routes/insumo.routes"));
const persona_routes_1 = __importDefault(require("../routes/persona.routes"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
const orden_routes_1 = __importDefault(require("../routes/orden.routes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const inbox_routes_1 = __importDefault(require("../routes/inbox.routes"));
const mensaje_routes_1 = __importDefault(require("../routes/mensaje.routes"));
//agregue esto
const http_1 = require("http");
const socket_io_1 = require("socket.io");
class Server {
    constructor() {
        //
        this.apiPaths = {
            administrador: '/api/administrador',
            empleado: '/api/empleado',
            insumo: '/api/insumo',
            persona: '/api/persona',
            usuario: '/api/usuario',
            orden: '/api/orden',
            inbox: '/api/inbox',
            mensaje: '/api/mensaje'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || "8000";
        //agregue esto
        this._serverhttps = http_1.createServer(this.app);
        this.sockets();
        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    //agregue esto
    sockets() {
        this.io = new socket_io_1.Server(this._serverhttps);
    }
    //
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database Connect successs!!");
            }
            catch (error) {
                console.log("Database Failed!!");
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //Lectura del Body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.administrador, administrador_routes_1.default);
        this.app.use(this.apiPaths.empleado, empleado_routes_1.default);
        this.app.use(this.apiPaths.insumo, insumo_routes_1.default);
        this.app.use(this.apiPaths.persona, persona_routes_1.default);
        this.app.use(this.apiPaths.usuario, usuario_routes_1.default);
        this.app.use(this.apiPaths.orden, orden_routes_1.default);
        this.app.use(this.apiPaths.inbox, inbox_routes_1.default);
        this.app.use(this.apiPaths.mensaje, mensaje_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            /*this.app.listen(this.port,() =>{
                 console.log('Servidor corriendo en puerto : ' + this.port);
             })*/
            this._serverhttps = yield this._serverhttps.listen(this.app.get('port'), () => {
                console.log('Server on port %s', this.app.get('port'));
            });
            //esto agregue
            this.io.on("connection", (socket) => {
                socket.on("send_message", (data) => {
                    socket.broadcast.emit("receive_message", data);
                    console.log("se conecto");
                });
            });
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map