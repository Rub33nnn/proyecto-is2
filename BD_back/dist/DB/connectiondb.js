"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Aqui se hace la conexion a la BD
const sequilize = new sequelize_1.Sequelize('bd_appmensajeria', 'root', 'root', {
    host: 'localhost', //Host
    dialect: 'mysql' //el server que usamos para la bd en este caso mysql
});
exports.default = sequilize;
