import { Request,Response } from "express"
import User from "../models/user"
import Conversation from "../models/conversations"
import Userinfo from "../models/userinfo"
import sequilize from "../DB/connectiondb"
import { Sequelize, QueryTypes } from "sequelize"
import Mensaje from "../models/mensaje"
import CreateConversation from "../models/createconversation"
import nodemailer from "nodemailer";  // Para enviar correos electronicos
import crypto  from 'crypto';
interface User {
    email: string;
  }

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

export const recoverPassword = async (req: Request, res: Response) => {
    let { email } = req.body;  
    //validamos el email
    try {
      if (!email) {
        return res.status(400).json({ message: 'El correo electronico es obligatorio ' });
      }
  
     
      const recoveryToken = crypto.randomBytes(32).toString('hex');
      const recoveryTokenExpiration = Date.now() + 3600000; 
  
    //se supone q aqui realizamos la cosulta
      const userResults = await sequilize.query<User>(
        `SELECT email FROM users WHERE email = :email`,
        {
          replacements: { email },
          type: QueryTypes.SELECT
        }
      );
  
      // Verificamos si encontramos algún usuario
      if (userResults.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
      // `userResults` es un arreglo, por lo que tenemos que asegurarnos de que haya al menos un usuario.
      const userResult = userResults[0];  // Asumiendo que estamos buscando solo un usuario por email
  
      if (!userResult.email) {
        return res.status(404).json({ message: 'El usuario no tiene un correo electronico valido' });
      }
  
      const userEmail = userResult.email; 
  
   
      await sequilize.query(
        `UPDATE users SET recoveryToken = :recoveryToken, recoveryTokenExpiration = :recoveryTokenExpiration WHERE email = :email`,
        {
          replacements: {
            recoveryToken,
            recoveryTokenExpiration,
            email
          }
        }
      );
  
      const recoveryLink = `http://localhost:3000/Reset/${recoveryToken}`;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,  // De
        to: userEmail,                 // A quién se enviará
        subject: 'Recuperación de Contraseña',
        text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryToken}`
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.json({ message: 'Correo de recuperación enviado con éxito.' });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Hubo un error al recuperar la contraseña.' });
    }
  };


  
  export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params; // Obtenemos el token desde la URL
    const { password } = req.body; // La nueva contraseña que se envia en el cuerpo de la solicitud
  
    try {
      // Validamos que se haya enviado la contraseña y el token
      if (!password || !token) {
        return res.status(400).json({ message: 'El token y la nueva contraseña son obligatorios.' });
      }
  
      // Verificamos que el token esté presente en la base de datos
      const userResults = await sequilize.query<User>(
        `SELECT * FROM users WHERE recoveryToken = :token AND recoveryTokenExpiration > :now`,
        {
          replacements: { token, now: Date.now() },
          type: QueryTypes.SELECT,
        }
      );
  
      // Si no encontramos un usuario o el token ha expirado
      if (userResults.length === 0) {
        return res.status(404).json({ message: 'Token inválido o expirado.' });
      }
  
      // Tomamos al usuario
      const user = userResults[0];
  
      // Actualizamos la contraseña del usuario en la base de datos
      await sequilize.query(
        `UPDATE users SET password = :password, recoveryToken = NULL, recoveryTokenExpiration = NULL WHERE email = :email`,
        {
          replacements: { password, email: user.email },
        }
      );
  
      // Enviamos una respuesta de éxito
      return res.json({ message: 'Contraseña restablecida con éxito.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Hubo un error al restablecer la contraseña.' });
    }
  };