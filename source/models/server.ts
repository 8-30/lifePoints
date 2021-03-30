import express,{Application} from 'express';
import adminRoutes from '../routes/administrador.routes';
import empleRoutes from '../routes/empleado.routes';
import insuRoutes from '../routes/insumo.routes';
import personaRoutes from '../routes/persona.routes';
import usuarioRoutes  from '../routes/usuario.routes';
import ordenRoutes  from '../routes/orden.routes';
import cors from 'cors';
import db from '../database/connection';
import inboxRoutes from '../routes/inbox.routes';
import mensajeRoutes from '../routes/mensaje.routes';
//agregue esto
import { Server as Serverhttps,createServer } from "http";
import { Server as Serverio, Socket } from "socket.io";



class Server {
    

    private app: Application;
    private port: string;
    // agregue esto
    private _serverhttps : Serverhttps;
    public io :any;
    //
    private apiPaths = {
        administrador:'/api/administrador',
        empleado:'/api/empleado',
        insumo:'/api/insumo',
        persona: '/api/persona',
        usuario: '/api/usuario',
        orden: '/api/orden',
        inbox: '/api/inbox',
        mensaje: '/api/mensaje'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8000";
        //agregue esto
        this._serverhttps = createServer(this.app);
        this.sockets();
        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    //agregue esto
    private sockets(): void {
        this.io = new Serverio(this._serverhttps);
    }
    //

    async dbConnection(){
        try {
            await db.authenticate();
            console.log("Database Connect successs!!");
        } catch (error) {
            console.log("Database Failed!!");
            throw new Error(error);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura del Body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use( this.apiPaths.administrador, adminRoutes)
        this.app.use( this.apiPaths.empleado,empleRoutes )
        this.app.use( this.apiPaths.insumo,insuRoutes )
        this.app.use( this.apiPaths.persona, personaRoutes)
        this.app.use( this.apiPaths.usuario, usuarioRoutes)
        this.app.use( this.apiPaths.orden, ordenRoutes)
        this.app.use( this.apiPaths.inbox, inboxRoutes)
        this.app.use( this.apiPaths.mensaje, mensajeRoutes)
    }



    async listen(){
        
       /*this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en puerto : ' + this.port);
        })*/
        //esto agregue

        this._serverhttps=this._serverhttps.listen(this.port, () => {
            console.log('Server on port %s', this.port);
        });
    }
    get server(): Serverhttps {
        return this._serverhttps;
    }
}

export default Server