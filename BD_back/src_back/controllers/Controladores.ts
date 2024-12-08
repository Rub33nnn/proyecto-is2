import { Request,Response } from "express"
import User from "../models/user"
import Conversation from "../models/conversations"
import Userinfo from "../models/userinfo"
import sequilize from "../DB/connectiondb"
import { Sequelize } from "sequelize"
import Mensaje from "../models/mensaje"
import CreateConversation from "../models/createconversation"

export const getUsers = async (req: Request, res:Response) =>{
    const listuse = await User.findAll()
    res.json(listuse)
}

//Los metodos get, post etc estan definidos en /routes/user.ts
export const getUSer = async (req: Request, res:Response) =>{ //Esta se usa para hacer la consulta y buscar al usuario con el que se va a loguear
    const {email} = req.params  //Se usa el email para el login
    const user = await User.findAll({ //Hacemos la consulta y obtenemos el usuario regustrado con ese email
        where:{
            email: email
        }
    })

    if(user){
        res.json(user) //Si hay un resultado se guardan los datos que encotramos en la estructura User (la que esta definida en models/user) y se maneja como un json
        console.log(user)
    }else{
        res.status(404).json({
            msg:'No existe este usuario'
        })
    }
}

export const getUSerbypk = async (req: Request, res:Response) =>{ //Esta es para buscar usuarios por la pk, no se si la ocupamos para algo pero ahi esta por si acaso
    const {id} = req.params
    const user = await Userinfo.findByPk(id)
    
    if(user){
        res.json(user)
        console.log(user)
    }else{
        res.status(404).json({
            msg:'No existe este usuario'
        })
    }
}
     

export const addUSer = async (req: Request, res:Response) =>{ //Esta es para añadir usuarios, lo que hace es que recibe un json con los datos del usuario que se va a añadir y los inserta en la bd
    const {body} = req

    try{
        await User.create(body)
        console.log(body)
        res.json({
        msg: 'add user',
    })
    }catch(error){
        res.json({
            msg:'No se pudo agregar el usuario'
        })
    }
    
}

export const updateuser = async(req: Request, res: Response) =>{
    const {body} = req
    const {email} = req.body

    console.log(email)
    const user = await User.findOne({ //Hacemos la consulta y obtenemos el usuario regustrado con ese email
        where:{
            email: email
        }
    })
    try{
        await user?.update(body)
        console.log(body)
        res.json({
            msg: 'Usuario actualizado'
        })
    }catch(error){
        res.json({
            msg:'No se pudo actualizar al usuario' + error
        })
    }
}

export const deleteuser = async(req:Request, res:Response) =>{
    const {email} = req.params
    console.log(email)
    await User.destroy({ //Hacemos la consulta y obtenemos el usuario regustrado con ese email
        where:{
            email: email
        }
    })
    res.json({
        msg: 'Usuario eliminaod',
    })
}

export const obtenerconversacion = async(req:Request, res:Response) =>{ //Se obtienen las conversasiones a las que pertenezca un usuario
    const {iduser} = req.params

    console.log(iduser)
    try{
        const results = await sequilize.query('CALL obtenerconversasionesdeusuario(:iduser)', {
            replacements:{iduser},
        })
        res.status(200).json(results)
    }catch(err){
        console.error("Error al ejecutar el procedimiento: ", err)
        res.status(500).json({
            error: "Error al obtener la conversasion. "
        })
    }
    
}

export const obtenermensajes = async(req:Request, res:Response) =>{ //Se obtienen los mensajes de un usuario
    const {idconversacion} = req.params  
    const mensaje = await Mensaje.findAll({ 
        where:{
            conversation_id: idconversacion
        }
    })

    if(mensaje){
        res.json(mensaje)
        console.log(mensaje)
    }else{
        res.status(404).json({
            msg:'No existe la conversacion'
        })
    }
}

export const crearconversacion = async (req: Request, res:Response) =>{ //Crear una conversasion
    const {body} = req

    try{
        await CreateConversation.create(body)
        console.log(body)
        res.json({
        msg: 'add conversation',
    })
    }catch(error){
        res.json({
            msg:'No se pudo agregar la conversasion'
        })
    }
    
}

export const enviarmensaje = async (req:Request, res:Response) =>{ //Envia un mensaje
    const {body} = req
    try {
        await Mensaje.create(body)
        console.log(body)
        res.json({
            msg:"Mensaje sendeado"
        })
    }
    catch(error){
        res.json({
            msg:"No se pudo mandar el mensaje"
        })
    }
}

export const sendemail = async(req:Request, res:Response) =>{
    console.log("Manda email")
}