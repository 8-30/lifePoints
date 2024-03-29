"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const administrador_controller_1 = require("./../controller/administrador.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', administrador_controller_1.getAdministradores);
router.get('/:id', administrador_controller_1.getAdministrador);
router.post('/', administrador_controller_1.postAdministrador);
router.post('/autenticacion', administrador_controller_1.autenticacionAdministrador);
router.put('/:id', administrador_controller_1.putAdministrador);
router.delete('/:id', administrador_controller_1.deleteAdministrador);
router.get('/username/:username/password/:password', administrador_controller_1.AuthAdmin);
exports.default = router;
//# sourceMappingURL=administrador.routes.js.map