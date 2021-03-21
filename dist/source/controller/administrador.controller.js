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
exports.deleteAdministrador = exports.putAdministrador = exports.postAdministrador = exports.getAdministrador = exports.getAdministradores = void 0;
const administrador_model_1 = __importDefault(require("../models/administrador.model"));
const persona_model_1 = __importDefault(require("../models/persona.model"));
const getAdministradores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const administradores = yield administrador_model_1.default.findAll();
    //for para recorrer todos los administradors
    for (const administrador of administradores) {
        //llamamos a la funcion para vincular a los administradors con su informacion de personas
        yield obtenerInformacionAdministrador(administrador);
    }
    ;
    res.json({
        administradores
    });
});
exports.getAdministradores = getAdministradores;
const getAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const administrador = yield administrador_model_1.default.findByPk(id);
    if (administrador) {
        yield obtenerInformacionAdministrador(administrador);
        res.json({
            administrador
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun usuario con el ide ${id}`
        });
    }
});
exports.getAdministrador = getAdministrador;
const postAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        ///const administrador = Administrador.create(body);
        //para guardar peromero los datos de persona persona
        const persona = new persona_model_1.default(body);
        yield persona.save();
        // creamos administrador y asignamos el id de persona guardado anteriormente
        const administrador = new administrador_model_1.default(body);
        administrador.setDataValue("idAdministrador", persona.idPersona);
        administrador.save();
        res.json({
            administrador,
            persona
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postAdministrador = postAdministrador;
const putAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const administrador = yield administrador_model_1.default.findByPk(id);
        if (!administrador) {
            return res.status(404).json({
                msg: `no existe ningun administrador con el id ${id}`,
            });
        }
        yield administrador.update(body);
        // buscamos a la persona con el mismo id de administrador y la actualizamos
        const persona = yield persona_model_1.default.findByPk(id);
        yield (persona === null || persona === void 0 ? void 0 : persona.update(body));
        res.json({
            administrador,
            persona
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putAdministrador = putAdministrador;
const deleteAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const administrador = yield administrador_model_1.default.findByPk(id);
        if (!administrador) {
            return res.status(404).json({
                msg: `No existe un administrador con el id ${id}`
            });
        }
        yield administrador.destroy();
        // buscamos a la persona con el mismo id de administrador y la actualizamos
        const persona = yield persona_model_1.default.findByPk(id);
        yield (persona === null || persona === void 0 ? void 0 : persona.destroy());
        res.json({
            administrador,
            persona
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.deleteAdministrador = deleteAdministrador;
//funciones
function obtenerInformacionAdministrador(administrador) {
    return __awaiter(this, void 0, void 0, function* () {
        //buscamos a la persona que tenga el mismo id que el administrador
        const persona = yield persona_model_1.default.findOne({
            where: {
                idPersona: administrador.idAdministrador,
            }
        });
        //Se asigna la informacion de persona al administrador
        //(se pone el if para que no salga error porque siempre va a existir 1 persona por 1 administrador pero la wea no reconoce y sale error)
        if (persona) {
            administrador.setDataValue("persona", persona);
        }
    });
}
//# sourceMappingURL=administrador.controller.js.map