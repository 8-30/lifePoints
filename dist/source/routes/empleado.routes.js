"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empleado_controller_1 = require("./../controller/empleado.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', empleado_controller_1.getEmpleados);
router.get('/:id', empleado_controller_1.getEmpleado);
router.post('/', empleado_controller_1.postEmpleado);
router.put('/:id', empleado_controller_1.putEmpleado);
router.delete('/:id', empleado_controller_1.deleteEmpleado);
exports.default = router;
//# sourceMappingURL=empleado.routes.js.map