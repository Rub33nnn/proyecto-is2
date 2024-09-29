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
exports.updateuser = exports.addUSer = exports.getUSerbypk = exports.getUSer = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const userinfo_1 = __importDefault(require("../models/userinfo"));
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
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
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
//cuando quieras agregar una funcion para actualizar datos usas el metodo put
