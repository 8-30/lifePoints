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
exports.deleteEmpleado = exports.putEmpleado = exports.postEmpleado = exports.getEmpleado = exports.getEmpleados = void 0;
const empleado_models_1 = __importDefault(require("../models/empleado.models"));
const persona_model_1 = __importDefault(require("../models/persona.model"));
const getEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empleados = yield empleado_models_1.default.findAll();
    //for para recorrer todos los empleados
    for (const empleado of empleados) {
        //llamamos a la funcion para vincular a los empleados con su informacion de personas
        yield obtenerInformacionEmpleado(empleado);
    }
    ;
    res.json({
        empleados
    });
});
exports.getEmpleados = getEmpleados;
const getEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const empleado = yield empleado_models_1.default.findByPk(id);
    if (empleado) {
        yield obtenerInformacionEmpleado(empleado);
        res.json({
            empleado
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun usuario con el ide ${id}`
        });
    }
});
exports.getEmpleado = getEmpleado;
const postEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        ///const administrador = Administrador.create(body);
        //para guardar peromero los datos de persona persona
        const persona = new persona_model_1.default(body);
        yield persona.save();
        // creamos empleado y asignamos el id de persona guardado anteriormente
        const empleado = new empleado_models_1.default(body);
        empleado.setDataValue("idEmpleado", persona.idPersona);
        empleado.save();
        res.json({
            empleado,
            persona
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postEmpleado = postEmpleado;
const putEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const empleado = yield empleado_models_1.default.findByPk(id);
        if (!empleado) {
            return res.status(404).json({
                msg: `no existe ningun empleado con el id ${id}`,
            });
        }
        yield empleado.update(body);
        // buscamos a la persona con el mismo id de empleado y la actualizamos
        const persona = yield persona_model_1.default.findByPk(id);
        yield (persona === null || persona === void 0 ? void 0 : persona.update(body));
        res.json({
            empleado,
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
exports.putEmpleado = putEmpleado;
const deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const empleado = yield empleado_models_1.default.findByPk(id);
        if (!empleado) {
            return res.status(404).json({
                msg: `No existe un empleado con el id ${id}`
            });
        }
        yield empleado.destroy();
        // buscamos a la persona con el mismo id de empleado y la actualizamos
        const persona = yield persona_model_1.default.findByPk(id);
        yield (persona === null || persona === void 0 ? void 0 : persona.destroy());
        res.json({
            empleado,
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
exports.deleteEmpleado = deleteEmpleado;
//funciones
function obtenerInformacionEmpleado(empleado) {
    return __awaiter(this, void 0, void 0, function* () {
        //buscamos a la persona que tenga el mismo id que el empleado
        const persona = yield persona_model_1.default.findOne({
            where: {
                idPersona: empleado.idEmpleado,
            }
        });
        //Se asigna la informacion de persona al empleado
        //(se pone el if para que no salga error porque siempre va a existir 1 persona por 1 empleado pero la wea no reconoce y sale error)
        if (persona) {
            empleado.setDataValue("persona", persona);
        }
    });
}
//# sourceMappingURL=empleado.controller%20copy.js.map