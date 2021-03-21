"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insumo_controller_1 = require("./../controller/insumo.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', insumo_controller_1.getInsumos);
router.get('/:id', insumo_controller_1.getInsumo);
router.get('/empleado/:id', insumo_controller_1.getInsumoEmpleado);
router.post('/', insumo_controller_1.postInsumo);
router.put('/:id', insumo_controller_1.putInsumo);
router.delete('/:id', insumo_controller_1.deleteInsumo);
exports.default = router;
//# sourceMappingURL=insumo.routes.js.map