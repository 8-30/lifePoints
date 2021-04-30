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
exports.notify = exports.deleteMensaje = exports.putMensaje = exports.postMensaje = exports.getMensaje = exports.getLastMensajeInbox = exports.getAllMensajeInbox = exports.getAllMensaje = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const mensaje_model_1 = __importDefault(require("../models/mensaje.model"));
const getAllMensaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mensajees = yield mensaje_model_1.default.findAll();
    res.json({
        mensajees
    });
});
exports.getAllMensaje = getAllMensaje;
const getAllMensajeInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    var mensaje = yield mensaje_model_1.default.findAll({
        where: {
            idInbox: id
        }
    });
    if (mensaje) {
        res.json({
            mensaje
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun mensaje del inbox con el id: ${id}`
        });
    }
});
exports.getAllMensajeInbox = getAllMensajeInbox;
const getLastMensajeInbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    var mensajes = yield mensaje_model_1.default.findAll({
        where: {
            idInbox: id
        }
    });
    var mensaje = mensajes[mensajes.length - 1];
    if (mensaje) {
        res.json({
            mensaje
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun mensaje del inbox con el id: ${id}`
        });
    }
});
exports.getLastMensajeInbox = getLastMensajeInbox;
const getMensaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const mensaje = yield mensaje_model_1.default.findByPk(id);
    if (mensaje) {
        res.json({
            mensaje
        });
    }
    else {
        res.status(404).json({
            msg: `no existe ningun mensaje con el id ${id}`
        });
    }
});
exports.getMensaje = getMensaje;
const postMensaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const mensaje = new mensaje_model_1.default(body);
        mensaje.save();
        res.json(mensaje);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postMensaje = postMensaje;
const putMensaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const mensaje = yield mensaje_model_1.default.findByPk(id);
        if (!mensaje) {
            return res.status(404).json({
                msg: `no existe ningun mensaje con el id ${id}`,
            });
        }
        yield mensaje.update(body);
        res.json(mensaje);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putMensaje = putMensaje;
const deleteMensaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const mensaje = yield mensaje_model_1.default.findByPk(id);
    if (mensaje) {
        res.json({
            mensaje
        });
    }
    yield (mensaje === null || mensaje === void 0 ? void 0 : mensaje.destroy());
    res.json(mensaje);
});
exports.deleteMensaje = deleteMensaje;
const notify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // This registration token comes from the client FCM SDKs.
    var registrationToken = 'fb0aBpdpTC2hUX9qC3V5H7:APA91bFUi8xgBA-EWfIe1c9BSBQz-op42pD0AKQDp5sA84HKLjPfJ8Ma66YkPsDuhzI08UkMSH6qX0SIrmnTpT2To4DEa9zKV2tAAtb_olBfqdSXVoc7oGOf0i_cHTPUwumhzpNKxd40';
    var message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: registrationToken
    };
    // Send a message to the device corresponding to the provided
    // registration token.
    firebase_admin_1.default.messaging().send(message)
        .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
});
exports.notify = notify;
//# sourceMappingURL=mensaje.controller.js.map