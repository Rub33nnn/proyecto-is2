"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/', users_1.getUsers); //Los metodos get son los SELECT de sql, aqui declaro varios metodos que realizaran distintos tipos de consulta, este seria un select *
router.get('/:email', users_1.getUSer); //este seria un select * where campo = dato
router.get('/pk/:id', users_1.getUSerbypk); //Este nomas selecciona por pk
router.post('/', users_1.addUSer); //el metodo post es el insert, con este metodo añadimos usuarios
router.put('/:id', users_1.updateuser); //El metodo put es el update, con este metodo editamos la info de los usuarios
exports.default = router;
