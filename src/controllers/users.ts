import { Request,Response } from "express"
import User from "../models/user"
import Userinfo from "../models/userinfo"

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
    const {id} = req.params
    const user = await User.findByPk(id)
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

//cuando quieras agregar una funcion para actualizar datos usas el metodo put