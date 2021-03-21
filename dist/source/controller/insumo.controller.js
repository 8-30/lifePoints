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
exports.deleteInsumo = exports.putInsumo = exports.postInsumo = exports.getInsumoEmpleado = exports.getInsumo = exports.getInsumos = void 0;
const insumo_models_1 = __importDefault(require("../models/insumo.models"));
const getInsumos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const insumo = yield insumo_models_1.default.findAll();
    res.json({
        insumo
    });
});
exports.getInsumos = getInsumos;
const getInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const insumo = yield insumo_models_1.default.findByPk(id);
    if (insumo) {
        res.json({
            insumo
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun insumo con el id ${id}`
        });
    }
});
exports.getInsumo = getInsumo;
const getInsumoEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const insumos = yield insumo_models_1.default.findAll({
        where: {
            idInsumoEmpleado: id
        }
    });
    if (insumos) {
        res.json({
            insumos
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun empleado con el id ${id}`
        });
    }
});
exports.getInsumoEmpleado = getInsumoEmpleado;
const postInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const insumo = new insumo_models_1.default(body);
        insumo.save();
        res.json(insumo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postInsumo = postInsumo;
const putInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const insumo = yield insumo_models_1.default.findByPk(id);
        if (!insumo) {
            return res.status(404).json({
                msg: `no existe ningun insumo con el id ${id}`,
            });
        }
        yield insumo.update(body);
        res.json(insumo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putInsumo = putInsumo;
const deleteInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const insumo = yield insumo_models_1.default.findByPk(id);
    if (insumo) {
        res.json({
            insumo
        });
    }
    yield (insumo === null || insumo === void 0 ? void 0 : insumo.destroy());
    res.json(insumo);
});
exports.deleteInsumo = deleteInsumo;
//# sourceMappingURL=insumo.controller.js.map