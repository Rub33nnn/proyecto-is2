import { Request,Response } from "express"
import crypto  from 'crypto';
import User from "../models/user"
import Userinfo from "../models/userinfo"
import nodemailer from "nodemailer";  // Para enviar correos electronicos
import { Sequelize, QueryTypes} from "sequelize";
import sequilize from "../DB/connectiondb";

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

    const recoveryLink = `http://localhost:3000/reset/${recoveryToken}`;
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
      text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryLink}`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: 'Correo de recuperación enviado con éxito.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al recuperar la contraseña.' });
  }
};

//cuando quieras agregar una funcion para actualizar datos usas el metodo put