"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controller/usuario.controller");
const router = express_1.Router();
router.get('/', usuario_controller_1.getusuarios);
router.get('/:id', usuario_controller_1.getusuario);
router.post('/', usuario_controller_1.postusuario);
router.put('/:id', usuario_controller_1.putusuario);
router.delete('/:id', usuario_controller_1.deleteusuario);
exports.default = router;
//# sourceMappingURL=usuario.routes%20copy.js.map