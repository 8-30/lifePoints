import {Sequelize} from "sequelize-typescript"
import Administrador from "../models/administrador.model";
import Empleado from "../models/empleado.models";
import Insumo from "../models/insumo.models";
import Orden from "../models/orden.model";
import Persona from "../models/persona.model";
import Usuario from "../models/usuario.model";

const db = new Sequelize('lifepoints', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    models: [Persona,Administrador,Empleado,Insumo, Usuario, Orden] 
});

export default db;