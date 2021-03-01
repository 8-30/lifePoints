import express,{Application} from 'express';
import userRoutes from '../routes/usuarios.routes';
import cors from 'cors';
import db from '../database/connection';
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
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
            console.log(__dirname);
            console.log("Database Connect successs!!");
        } catch (error) {
            console.log("Database  Failed!!");
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
    }



    listen(){
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en puerto : ' + this.port);
        })
    }
}

export default Server