import {Sequelize} from "sequelize-typescript"
import Administrador from "../models/administrador.model";
import Empleado from "../models/empleado.models";
import Inbox from "../models/inbox.model";
import Insumo from "../models/insumo.models";
import Mensaje from "../models/mensaje.model";
import Orden from "../models/orden.model";
import Persona from "../models/persona.model";
import Usuario from "../models/usuario.model";

const db = new Sequelize('SyrrRfsQBR', 'SyrrRfsQBR', 'crqqqER3ZK', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    models: [Persona,Administrador,Empleado,Insumo, Usuario, Orden, Mensaje, Inbox] 
});

export default db;