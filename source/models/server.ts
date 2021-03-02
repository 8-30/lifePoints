import express,{Application} from 'express';
import userRoutes from '../routes/usuarios.routes';
import adminRoutes from '../routes/administrador.routes';
import empleRoutes from '../routes/empleado.routes';
import insuRoutes from '../routes/insumo.routes';
import cors from 'cors';
import db from '../database/connection';
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        administrador:'/api/administradores',
        empleado:'/api/empleados',
        insumo:'/api/insumos'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8000";
        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

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
        this.app.use( this.apiPaths.usuarios, userRoutes)
        this.app.use( this.apiPaths.administrador, adminRoutes)
        this.app.use( this.apiPaths.empleado,empleRoutes )
        this.app.use( this.apiPaths.insumo,insuRoutes )
    }



    listen(){
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en puerto : ' + this.port);
        })
    }
}

export default Server