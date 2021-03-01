import {Sequelize} from "sequelize-typescript"
import Persona from "../models/usuario.model";

const db = new Sequelize('lifepoints', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    models: [Persona] 
});

export default db;