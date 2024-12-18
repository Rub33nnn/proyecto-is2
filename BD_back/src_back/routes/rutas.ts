import { Router } from "express";
/*import { sendRecoveryEmail } from "../controllers/emailController";*/
import User from "../models/user";
import { where} from "sequelize";
import sequilize from "../DB/connectiondb";
import { addUSer, deleteuser, getUSer, getUSerbypk, getUsers, updateuser, obtenerconversacion, obtenermensajes, crearconversacion, enviarmensaje, getUSerbyName} from "../controllers/Controladores";
const router = Router()

router.get('/', getUsers) //Los metodos get son los SELECT de sql, aqui declaro varios metodos que realizaran distintos tipos de consulta, este seria un select *
router.get('/:email', getUSer) //este seria un select * where campo = dato
router.get('/pk/:id',getUSerbypk) //Este nomas selecciona por pk
router.post('/', addUSer) //el metodo post es el insert, con este metodo añadimos usuarios
router.put('/', updateuser) //El metodo put es el update, con este metodo editamos la info de los usuarios
router.get('/obtenerconversacion/:iduser',obtenerconversacion)
router.get('/obtenermensajes/:idconversacion', obtenermensajes)
router.post('/crearconversacion', crearconversacion)
router.post('/enviarmensaje', enviarmensaje)
router.delete('/:email', deleteuser)
router.get('/getUSerbyName', getUSerbyName)

/*
router.post('/api/login/recover/:email', async (req, res) => {
    const { email } = req.params;
    try {
      // Verificar que el usuario existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'El correo no está registrado.' });
      }
  
      // Generar token de recuperación
      const recoverytoken = crypto.randomBytes(8).toString('hex');
      const recoverytokenexpiration = Date.now() + 60;  //
  
      // Guardar el token y la fecha de expiración en la base de datos
      await sequilize.query(
        "UPDATE users SET recoverytoken = :recoverytoken, recoverytokenexpiration = :recoverytokenexpiration WHERE email = :email",
        {
          replacements: { recoverytoken, recoverytokenexpiration, email }
        }
      );
  
      // Enviar correo de recuperación
      const recoveryUrl = `"http://localhost:5173/Reset/${recoverytoken}`;
      const emailResult = await sendRecoveryEmail(email, recoveryUrl);
  
      if (emailResult.success) {
        res.status(200).json({ message: 'Se ha enviado un enlace de recuperación a tu correo electrónico.' });
      } else {
        res.status(500).json({ message: 'Error al enviar el correo. Por favor, intenta nuevamente.' });
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de recuperación:', error);
      res.status(500).json({ message: 'Error interno en el servidor' });
    }
  });
*/

export default router