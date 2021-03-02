import {Sequelize} from "sequelize-typescript"
import Orden from "../models/orden.model";
import Persona from "../models/persona.model";
import Usuario from "../models/usuario.model";

const db = new Sequelize('lifepoints', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    models: [Persona, Usuario, Orden] 
});

export default db;