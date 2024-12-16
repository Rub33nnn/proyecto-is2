"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controladores_1 = require("../controllers/Controladores");
const router = (0, express_1.Router)();
router.get('/', Controladores_1.getUsers); //Los metodos get son los SELECT de sql, aqui declaro varios metodos que realizaran distintos tipos de consulta, este seria un select *
router.get('/:email', Controladores_1.getUSer); //este seria un select * where campo = dato
router.get('/pk/:id', Controladores_1.getUSerbypk); //Este nomas selecciona por pk
router.post('/recover/:email', Controladores_1.recoverPassword);
router.post('/', Controladores_1.addUSer); //el metodo post es el insert, con este metodo añadimos usuarios
router.put('/', Controladores_1.updateuser); //El metodo put es el update, con este metodo editamos la info de los usuarios
router.get('/obtenerconversacion/:iduser', Controladores_1.obtenerconversacion);
router.get('/obtenermensajes/:idconversacion', Controladores_1.obtenermensajes);
router.post('/crearconversacion', Controladores_1.crearconversacion);
router.post('/enviarmensaje', Controladores_1.enviarmensaje);
router.delete('/:email', Controladores_1.deleteuser);
router.put('/reset/:token', Controladores_1.resetPassword);
exports.default = router;
