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
exports.deletepersona = exports.putpersona = exports.postpersona = exports.getpersona = exports.getpersonas = void 0;
const persona_model_1 = __importDefault(require("../models/persona.model"));
const getpersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personas = yield persona_model_1.default.findAll();
    res.json({
        msg: 'personas',
        personas
    });
});
exports.getpersonas = getpersonas;
const getpersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield persona_model_1.default.findByPk(id);
    if (persona) {
        res.json(persona);
    }
    else {
        res.status(404).json({
            msg: `No existe una persona con el id ${id}`
        });
    }
});
exports.getpersona = getpersona;
const postpersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const persona = new persona_model_1.default(body);
        yield persona.save();
        res.json(persona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postpersona = postpersona;
const putpersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const persona = yield persona_model_1.default.findByPk(id);
        if (!persona) {
            return res.status(404).json({
                msg: `No existe una persona con el id ${id}`
            });
        }
        yield persona.update(body);
        res.json(persona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putpersona = putpersona;
const deletepersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const persona = yield persona_model_1.default.findByPk(id);
        if (!persona) {
            return res.status(404).json({
                msg: `No existe una persona con el id ${id}`
            });
        }
        yield persona.destroy();
        res.json(persona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.deletepersona = deletepersona;
//# sourceMappingURL=persona.controller.js.map