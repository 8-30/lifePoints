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
exports.deleteusuario = exports.putusuario = exports.postusuario = exports.getusuario = exports.getusuarios = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const getusuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_model_1.default.findAll();
    res.json({
        msg: 'usuarios',
        usuarios
    });
});
exports.getusuarios = getusuarios;
const getusuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getusuario',
        id
    });
};
exports.getusuario = getusuario;
const postusuario = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'postusuarios',
        body
    });
};
exports.postusuario = postusuario;
const putusuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'putusuarios',
        id,
        body
    });
};
exports.putusuario = putusuario;
const deleteusuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteusuarios',
        id
    });
};
exports.deleteusuario = deleteusuario;
//# sourceMappingURL=usuario.controller%20copy.js.map