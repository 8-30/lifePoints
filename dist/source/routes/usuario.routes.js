"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controller/usuario.controller");
const router = express_1.Router();
router.get('/', usuario_controller_1.getUsuarios);
router.get('/:id', usuario_controller_1.getUsuario);
router.get('/username/:username/password/:password', usuario_controller_1.AuthUsuario);
router.post('/autenticacion', usuario_controller_1.autenticacionUsuario);
router.post('/', usuario_controller_1.postUsuario);
router.put('/:id', usuario_controller_1.putUsuario);
router.put('/disable/:id', usuario_controller_1.disableUsuario);
router.delete('/:id', usuario_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map