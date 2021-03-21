"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const administrador_model_1 = __importDefault(require("../models/administrador.model"));
const empleado_models_1 = __importDefault(require("../models/empleado.models"));
const insumo_models_1 = __importDefault(require("../models/insumo.models"));
const orden_model_1 = __importDefault(require("../models/orden.model"));
const persona_model_1 = __importDefault(require("../models/persona.model"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const db = new sequelize_typescript_1.Sequelize('SyrrRfsQBR', 'SyrrRfsQBR', 'crqqqER3ZK', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    models: [persona_model_1.default, administrador_model_1.default, empleado_models_1.default, insumo_models_1.default, usuario_model_1.default, orden_model_1.default]
});
exports.default = db;
//# sourceMappingURL=connection.js.map