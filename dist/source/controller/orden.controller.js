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
exports.deleteorden = exports.putorden = exports.postorden = exports.getorden = exports.getordenes = void 0;
const orden_model_1 = __importDefault(require("../models/orden.model"));
const getordenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ordens = yield orden_model_1.default.findAll();
    res.json({
        msg: 'ordenes',
        ordens
    });
});
exports.getordenes = getordenes;
const getorden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const orden = yield orden_model_1.default.findByPk(id);
    if (orden) {
        res.json(orden);
    }
    else {
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        });
    }
});
exports.getorden = getorden;
const postorden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const orden = new orden_model_1.default(body);
        yield orden.save();
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postorden = postorden;
const putorden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const orden = yield orden_model_1.default.findByPk(id);
        if (!orden) {
            return res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
        yield orden.update(body);
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putorden = putorden;
const deleteorden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const orden = yield orden_model_1.default.findByPk(id);
        if (!orden) {
            return res.status(404).json({
                msg: `No existe una orden con el id ${id}`
            });
        }
        yield orden.destroy(body);
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.deleteorden = deleteorden;
//# sourceMappingURL=orden.controller.js.map