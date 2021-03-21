"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_controller_1 = require("../controller/persona.controller");
const router = express_1.Router();
router.get('/', persona_controller_1.getpersonas);
router.get('/:id', persona_controller_1.getpersona);
router.post('/', persona_controller_1.postpersona);
router.put('/:id', persona_controller_1.putpersona);
router.delete('/:id', persona_controller_1.deletepersona);
exports.default = router;
//# sourceMappingURL=persona.routes.js.map