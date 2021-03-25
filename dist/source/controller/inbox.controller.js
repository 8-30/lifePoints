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
exports.deleteInbox = exports.putInbox = exports.postInbox = exports.getInboxParticipantes = exports.getInboxPersona = exports.getInbox = exports.getAllInbox = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const inbox_model_1 = __importDefault(require("../models/inbox.model"));
const getAllInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inboxes = yield inbox_model_1.default.findAll();
    res.json({
        inboxes
    });
});
exports.getAllInbox = getAllInbox;
const getInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const inbox = yield inbox_model_1.default.findByPk(id);
    if (inbox) {
        res.json({
            inbox
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun inbox con el id ${id}`
        });
    }
});
exports.getInbox = getInbox;
const getInboxPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    var inbox = yield inbox_model_1.default.findAll({
        where: sequelize_typescript_1.Sequelize.or({ persona1: id }, { persona2: id })
    });
    if (inbox) {
        res.json({
            inbox
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun inbox de la persona con el id: ${id}`
        });
    }
});
exports.getInboxPersona = getInboxPersona;
const getInboxParticipantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id1 } = req.params;
    const { id2 } = req.params;
    var inbox = yield inbox_model_1.default.findAll({
        where: sequelize_typescript_1.Sequelize.or({ persona1: id1,
            persona2: id2 }, { persona1: id2,
            persona2: id1, })
    });
    if (inbox) {
        res.json({
            inbox
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun inbox de la persona con el id: ${id1}`
        });
    }
});
exports.getInboxParticipantes = getInboxParticipantes;
const postInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const inbox = new inbox_model_1.default(body);
        var inboxExistente = yield inbox_model_1.default.findAll({
            where: sequelize_typescript_1.Sequelize.or({ persona1: inbox.persona1,
                persona2: inbox.persona2 }, { persona1: inbox.persona2,
                persona2: inbox.persona1 })
        });
        if (inboxExistente.length == 0) {
            inbox.save();
            res.json(inbox);
        }
        else {
            res.status(500).json({
                msg: 'Ya existe ese inbox',
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
    /*try {
        const inbox = new Inbox(body);
        inbox.save();
        res.json(inbox);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }*/
});
exports.postInbox = postInbox;
const putInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const inbox = yield inbox_model_1.default.findByPk(id);
        if (!inbox) {
            return res.status(404).json({
                msg: `no existe ningun inbox con el id ${id}`,
            });
        }
        yield inbox.update(body);
        res.json(inbox);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putInbox = putInbox;
const deleteInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const inbox = yield inbox_model_1.default.findByPk(id);
    if (inbox) {
        res.json({
            inbox
        });
    }
    yield (inbox === null || inbox === void 0 ? void 0 : inbox.destroy());
    res.json(inbox);
});
exports.deleteInbox = deleteInbox;
//# sourceMappingURL=inbox.controller.js.map