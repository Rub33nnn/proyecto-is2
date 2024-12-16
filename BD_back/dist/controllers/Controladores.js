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
exports.resetPassword = exports.recoverPassword = exports.sendemail = exports.enviarmensaje = exports.crearconversacion = exports.obtenermensajes = exports.obtenerconversacion = exports.deleteuser = exports.updateuser = exports.addUSer = exports.getUSerbypk = exports.getUSer = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const userinfo_1 = __importDefault(require("../models/userinfo"));
const connectiondb_1 = __importDefault(require("../DB/connectiondb"));
const sequelize_1 = require("sequelize");
const mensaje_1 = __importDefault(require("../models/mensaje"));
const createconversation_1 = __importDefault(require("../models/createconversation"));
const nodemailer_1 = __importDefault(require("nodemailer")); // Para enviar correos electronicos
const crypto_1 = __importDefault(require("crypto"));
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
    const mensaje = yield mensaje_1.default.findAll({
        where: {
            conversation_id: idconversacion
        }
    });
    if (mensaje) {
        res.json(mensaje);
        console.log(mensaje);
    }
    else {
        res.status(404).json({
            msg: 'No existe la conversacion'
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
    }
});
exports.enviarmensaje = enviarmensaje;
const sendemail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Manda email");
});
exports.sendemail = sendemail;
const recoverPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.body;
    //validamos el email
    try {
        if (!email) {
            return res.status(400).json({ message: 'El correo electronico es obligatorio ' });
        }
        const recoveryToken = crypto_1.default.randomBytes(32).toString('hex');
        const recoveryTokenExpiration = Date.now() + 3600000;
        //se supone q aqui realizamos la cosulta
        const userResults = yield connectiondb_1.default.query(`SELECT email FROM users WHERE email = :email`, {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT
        });
        // Verificamos si encontramos algún usuario
        if (userResults.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // `userResults` es un arreglo, por lo que tenemos que asegurarnos de que haya al menos un usuario.
        const userResult = userResults[0]; // Asumiendo que estamos buscando solo un usuario por email
        if (!userResult.email) {
            return res.status(404).json({ message: 'El usuario no tiene un correo electronico valido' });
        }
        const userEmail = userResult.email;
        yield connectiondb_1.default.query(`UPDATE users SET recoveryToken = :recoveryToken, recoveryTokenExpiration = :recoveryTokenExpiration WHERE email = :email`, {
            replacements: {
                recoveryToken,
                recoveryTokenExpiration,
                email
            }
        });
        const recoveryLink = `http://localhost:3000/Reset/${recoveryToken}`;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER, // De
            to: userEmail, // A quién se enviará
            subject: 'Recuperación de Contraseña',
            text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryToken}`
        };
        yield transporter.sendMail(mailOptions);
        return res.json({ message: 'Correo de recuperación enviado con éxito.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al recuperar la contraseña.' });
    }
});
exports.recoverPassword = recoverPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params; // Obtenemos el token desde la URL
    const { password } = req.body; // La nueva contraseña que se envia en el cuerpo de la solicitud
    try {
        // Validamos que se haya enviado la contraseña y el token
        if (!password || !token) {
            return res.status(400).json({ message: 'El token y la nueva contraseña son obligatorios.' });
        }
        // Verificamos que el token esté presente en la base de datos
        const userResults = yield connectiondb_1.default.query(`SELECT * FROM users WHERE recoveryToken = :token AND recoveryTokenExpiration > :now`, {
            replacements: { token, now: Date.now() },
            type: sequelize_1.QueryTypes.SELECT,
        });
        // Si no encontramos un usuario o el token ha expirado
        if (userResults.length === 0) {
            return res.status(404).json({ message: 'Token inválido o expirado.' });
        }
        // Tomamos al usuario
        const user = userResults[0];
        // Actualizamos la contraseña del usuario en la base de datos
        yield connectiondb_1.default.query(`UPDATE users SET password = :password, recoveryToken = NULL, recoveryTokenExpiration = NULL WHERE email = :email`, {
            replacements: { password, email: user.email },
        });
        // Enviamos una respuesta de éxito
        return res.json({ message: 'Contraseña restablecida con éxito.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Hubo un error al restablecer la contraseña.' });
    }
});
exports.resetPassword = resetPassword;
