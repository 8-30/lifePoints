"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inbox_controller_1 = require("../controller/inbox.controller");
const express_1 = require("express");
const router = express_1.Router();
router.get('/', inbox_controller_1.getAllInbox);
router.get('/:id', inbox_controller_1.getInbox);
router.get('/persona/:id', inbox_controller_1.getInboxPersona);
router.post('/', inbox_controller_1.postInbox);
router.put('/:id', inbox_controller_1.putInbox);
router.delete('/:id', inbox_controller_1.deleteInbox);
exports.default = router;
//# sourceMappingURL=inbox.routes.js.map