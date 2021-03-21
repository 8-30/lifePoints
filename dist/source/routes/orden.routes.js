"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orden_controller_1 = require("../controller/orden.controller");
const router = express_1.Router();
router.get('/', orden_controller_1.getordenes);
router.get('/:id', orden_controller_1.getorden);
router.post('/', orden_controller_1.postorden);
router.put('/:id', orden_controller_1.putorden);
router.delete('/:id', orden_controller_1.deleteorden);
exports.default = router;
//# sourceMappingURL=orden.routes.js.map