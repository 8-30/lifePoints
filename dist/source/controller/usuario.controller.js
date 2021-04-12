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
exports.deleteUsuario = exports.disableUsuario = exports.putUsuario = exports.postUsuario = exports.autenticacionUsuario = exports.AuthUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const persona_model_1 = __importDefault(require("../models/persona.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_model_1.default.findAll();
    //for para recorrer todos los usuarios
    for (const usuario of usuarios) {
        //llamamos a la funcion para vincular a los usuarios con su informacion de personas
        yield obtenerInformacionUsuario(usuario);
    }
    ;
    res.json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_model_1.default.findByPk(id);
    if (usuario) {
        yield obtenerInformacionUsuario(usuario);
        res.json({
            usuario
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun usuario con el ide ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const AuthUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.params;
    const persona = yield persona_model_1.default.findOne({ where: { usuario: username } });
    if (!persona) {
        res.status(401).json({
            error: 'invalid user or password'
        });
    }
    const passwordCorrect = (persona === null) ? false : yield bcrypt_1.default.compare(password, persona.contrasenia);
    if (!(persona && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid user or password'
        });
    }
    res.json({
        usuario: persona === null || persona === void 0 ? void 0 : persona.usuario,
        idPersona: persona === null || persona === void 0 ? void 0 : persona.idPersona,
    });
});
exports.AuthUsuario = AuthUsuario;
const autenticacionUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { usuario, contrasenia } = body;
    const persona = yield persona_model_1.default.findOne({ where: { usuario: usuario } });
    if (!persona) {
        res.status(401).json({
            error: 'invalid user or password'
        });
    }
    const passwordCorrect = (persona === null) ? false : yield bcrypt_1.default.compare(contrasenia, persona.contrasenia);
    if (!(persona && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid user or password'
        });
    }
    res.json({
        usuario: persona === null || persona === void 0 ? void 0 : persona.usuario,
        idPersona: persona === null || persona === void 0 ? void 0 : persona.idPersona,
    });
});
exports.autenticacionUsuario = autenticacionUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        ///const administrador = Administrador.create(body);
        //para guardar peromero los datos de persona persona
        const { contrasenia } = body;
        const saltRaunds = 10;
        const passwordHash = yield bcrypt_1.default.hash(contrasenia, saltRaunds);
        const persona = new persona_model_1.default(body);
        persona.contrasenia = passwordHash;
        yield persona.save();
        // creamos usuario y asignamos el id de persona guardado anteriormente
        const usuario = new usuario_model_1.default(body);
        usuario.setDataValue("idUsuario", persona.idPersona);
        usuario.save();
        res.json({
            usuario,
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
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `no existe ningun usuario con el id ${id}`,
            });
        }
        yield usuario.update(body);
        // buscamos a la persona con el mismo id de usuario y la actualizamos
        const persona = yield persona_model_1.default.findByPk(id);
        yield (persona === null || persona === void 0 ? void 0 : persona.update(body));
        res.json(true);
    }
    catch (error) {
        res.json(false);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putUsuario = putUsuario;
const disableUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        var usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `no existe ningun usuario con el id ${id}`,
            });
        }
        usuario.setDataValue('enable', !usuario.enable);
        yield usuario.update({ enable: usuario.enable });
        res.json(usuario.enable);
    }
    catch (error) {
        res.json(false);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.disableUsuario = disableUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        yield usuario.destroy();
        // buscamos a la persona con el mismo id de usuario y la actualizamos
        const persona = yield persona_model_1.default.findByPk(id);
        yield (persona === null || persona === void 0 ? void 0 : persona.destroy());
        res.json({
            usuario,
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
exports.deleteUsuario = deleteUsuario;
//funciones
function obtenerInformacionUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        //buscamos a la persona que tenga el mismo id que el usuario
        const persona = yield persona_model_1.default.findOne({
            where: {
                idPersona: usuario.idUsuario,
            }
        });
        //Se asigna la informacion de persona al usuario
        //(se pone el if para que no salga error porque siempre va a existir 1 persona por 1 usuario pero la wea no reconoce y sale error)
        if (persona) {
            usuario.setDataValue("persona", persona);
        }
    });
}
//# sourceMappingURL=usuario.controller.js.map