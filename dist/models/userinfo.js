"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectiondb_1 = __importDefault(require("../DB/connectiondb"));
const sequelize_1 = require("sequelize");
//Ignoren esta, la iba a borrar pero mejor la dejo por si podemos sacar algo de aqui
const Userinfo = connectiondb_1.default.define('user', {
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    imguser: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    header: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Userinfo;
