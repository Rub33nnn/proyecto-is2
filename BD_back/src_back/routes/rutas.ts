import { Router } from "express";
import { addUSer, deleteuser, getUSer, getUSerbypk, getUsers, updateuser, sendemail, obtenerconversacion, obtenermensajes, crearconversacion, enviarmensaje, recoverPassword, resetPassword } from "../controllers/Controladores";

const router = Router()

router.get('/', getUsers) //Los metodos get son los SELECT de sql, aqui declaro varios metodos que realizaran distintos tipos de consulta, este seria un select *
router.get('/:email', getUSer) //este seria un select * where campo = dato
router.get('/pk/:id',getUSerbypk) //Este nomas selecciona por pk
router.post('/recover/:email', recoverPassword)

router.post('/', addUSer) //el metodo post es el insert, con este metodo añadimos usuarios
router.put('/', updateuser) //El metodo put es el update, con este metodo editamos la info de los usuarios
router.get('/obtenerconversacion/:iduser',obtenerconversacion)
router.get('/obtenermensajes/:idconversacion', obtenermensajes)
router.post('/crearconversacion', crearconversacion)
router.post('/enviarmensaje', enviarmensaje)
router.delete('/:email', deleteuser)
router.put('/reset/:token', resetPassword);


export default router