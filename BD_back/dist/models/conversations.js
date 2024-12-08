"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectiondb_1 = __importDefault(require("../DB/connectiondb"));
const sequelize_1 = require("sequelize");
//---Este modelo de conversasion se usa solo para obtenerlas, debido a que esta se usa para guardar la informacion de un stored procedure de la BD
//Aqui definimos un modelo donde vamos a guarda la informacion para la base de datos, este puede ser usado tanto para hacer consultas como para insertar en la BD
const Conversation = connectiondb_1.default.define('conversation', {
    titulo: {
        type: sequelize_1.DataTypes.STRING
    },
    idusuarioparticipante1: {
        type: sequelize_1.DataTypes.STRING
    },
    participante1: {
        type: sequelize_1.DataTypes.STRING
    },
    idusuarioparticipante2: {
        type: sequelize_1.DataTypes.STRING
    },
    participante2: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Conversation;
