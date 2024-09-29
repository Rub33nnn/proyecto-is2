import { Router } from "express";
import { addUSer, getUSer, getUSerbypk, getUsers, updateuser } from "../controllers/users";

const router = Router()

router.get('/', getUsers) //Los metodos get son los SELECT de sql, aqui declaro varios metodos que realizaran distintos tipos de consulta, este seria un select *
router.get('/:email', getUSer) //este seria un select * where campo = dato
router.get('/pk/:id',getUSerbypk) //Este nomas selecciona por pk
router.post('/', addUSer) //el metodo post es el insert, con este metodo añadimos usuarios
router.put('/:id', updateuser) //El metodo put es el update, con este metodo editamos la info de los usuarios
export default router