"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectiondb_1 = __importDefault(require("../DB/connectiondb"));
const sequelize_1 = require("sequelize");
//Aqui definimos un modelo donde vamos a guarda la informacion para la base de datos, este puede ser usado tanto para hacer consultas como para insertar en la BD
const User = connectiondb_1.default.define('user', {
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    imguser: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = User;
