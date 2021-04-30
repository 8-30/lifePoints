"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mensaje_controller_1 = require("../controller/mensaje.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', mensaje_controller_1.getAllMensaje);
router.get('/inbox/:id', mensaje_controller_1.getAllMensajeInbox);
router.get('/inboxlast/:id/', mensaje_controller_1.getLastMensajeInbox);
router.get('/:id', mensaje_controller_1.getMensaje);
router.post('/', mensaje_controller_1.postMensaje);
router.put('/:id', mensaje_controller_1.putMensaje);
router.delete('/:id', mensaje_controller_1.deleteMensaje);
exports.default = router;
//# sourceMappingURL=mensaje.routes.js.map