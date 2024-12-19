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
exports.sendemail = exports.obtenerultimaconversacion = exports.enviarmensaje = exports.crearconversacion = exports.obtenermensajes = exports.obtenerconversacion = exports.deleteuser = exports.updateuser = exports.addUSer = exports.getUSerbyName = exports.getUSerbypk = exports.getUSer = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const userinfo_1 = __importDefault(require("../models/userinfo"));
const connectiondb_1 = __importDefault(require("../DB/connectiondb"));
const mensaje_1 = __importDefault(require("../models/mensaje"));
const createconversation_1 = __importDefault(require("../models/createconversation"));
const oneconversation_1 = __importDefault(require("../models/oneconversation"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listuse = yield user_1.default.findAll();
    res.json(listuse);
});
exports.getUsers = getUsers;
//Los metodos get, post etc estan definidos en /routes/user.ts
const getUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params; //Se usa el email para el login
    const user = yield user_1.default.findAll({
        where: {
            email: email
        }
    });
    if (user) {
        res.json(user); //Si hay un resultado se guardan los datos que encotramos en la estructura User (la que esta definida en models/user) y se maneja como un json
        console.log(user);
    }
    else {
        res.status(404).json({
            msg: 'No existe este usuario'
        });
    }
});
exports.getUSer = getUSer;
const getUSerbypk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userinfo_1.default.findByPk(id);
    if (user) {
        res.json(user);
        console.log(user);
    }
    else {
        res.status(404).json({
            msg: 'No existe este usuario'
        });
    }
});
exports.getUSerbypk = getUSerbypk;
const getUSerbyName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params; //Se usa el email para el login
    const user = yield user_1.default.findAll({
        where: {
            username: username
        }
    });
    if (user) {
        res.json(user); //Si hay un resultado se guardan los datos que encotramos en la estructura User (la que esta definida en models/user) y se maneja como un json
        console.log(user);
    }
    else {
        res.status(404).json({
            msg: 'No existe este usuario'
        });
    }
});
exports.getUSerbyName = getUSerbyName;
const addUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield user_1.default.create(body);
        console.log(body);
        res.json({
            msg: 'add user',
        });
    }
    catch (error) {
        res.json({
            msg: 'No se pudo agregar el usuario'
        });
    }
});
exports.addUSer = addUSer;
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email } = req.body;
    console.log(email);
    const user = yield user_1.default.findOne({
        where: {
            email: email
        }
    });
    try {
        yield (user === null || user === void 0 ? void 0 : user.update(body));
        console.log(body);
        res.json({
            msg: 'Usuario actualizado'
        });
    }
    catch (error) {
        res.json({
            msg: 'No se pudo actualizar al usuario' + error
        });
    }
});
exports.updateuser = updateuser;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    console.log(email);
    yield user_1.default.destroy({
        where: {
            email: email
        }
    });
    res.json({
        msg: 'Usuario eliminaod',
    });
});
exports.deleteuser = deleteuser;
const obtenerconversacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { iduser } = req.params;
    console.log(iduser);
    try {
        const results = yield connectiondb_1.default.query('CALL obtenerconversasionesdeusuario(:iduser)', {
            replacements: { iduser },
        });
        res.status(200).json(results);
    }
    catch (err) {
        console.error("Error al ejecutar el procedimiento: ", err);
        res.status(500).json({
            error: "Error al obtener la conversasion. "
        });
    }
});
exports.obtenerconversacion = obtenerconversacion;
const obtenermensajes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idconversacion } = req.params;
    console.log(idconversacion);
    try {
        const results = yield connectiondb_1.default.query('CALL obtenermensajes(:idconversacion)', {
            replacements: { idconversacion },
        });
        res.status(200).json(results);
    }
    catch (err) {
        console.error("Error al ejecutar el procedimiento: ", err);
        res.status(500).json({
            error: "Error al obtener los mensajes. "
        });
    }
});
exports.obtenermensajes = obtenermensajes;
const crearconversacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield createconversation_1.default.create(body);
        console.log(body);
        res.json({
            msg: 'add conversation',
        });
    }
    catch (error) {
        res.json({
            msg: 'No se pudo agregar la conversasion'
        });
    }
});
exports.crearconversacion = crearconversacion;
const enviarmensaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield mensaje_1.default.create(body);
        console.log(body);
        res.json({
            msg: "Mensaje sendeado"
        });
    }
    catch (error) {
        res.json({
            msg: "No se pudo mandar el mensaje"
        });
        console.log(error);
    }
});
exports.enviarmensaje = enviarmensaje;
const obtenerultimaconversacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { iduser } = req.params; //Se usa el email para el login
    const user = yield oneconversation_1.default.findOne({
        where: {
            idusuarioparticipante1: iduser
        },
        order: [['id', 'DESC']],
    });
    if (user) {
        res.json(user); //Si hay un resultado se guardan los datos que encotramos en la estructura User (la que esta definida en models/user) y se maneja como un json
        console.log(user);
    }
    else {
        res.status(404).json({
            msg: 'No existe este usuario'
        });
    }
});
exports.obtenerultimaconversacion = obtenerultimaconversacion;
const sendemail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Manda email");
});
exports.sendemail = sendemail;
