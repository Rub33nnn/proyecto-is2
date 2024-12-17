/*
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar el transporte
transporter.verify().then(() => {
  console.log('Listo para enviar correos');
});

// Función para enviar correo de recuperación
export async function sendRecoveryEmail(email: string, frontendUrl: string) {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    const resetLink = `http://localhost:3000/Reset?token=${token}&email=${email}`;
    ;

    const info = await transporter.sendMail({
      from: '"Recuperación de Contraseña 👻" <carloseduardosotgarza@gmail.com>',
      to: email,
      subject: "Recupera tu contraseña",
      text: `Hola, haz clic en el siguiente enlace para recuperar tu contraseña: ${resetLink}`,
      html: `<p>Hola,</p>
             <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
             <a href="${resetLink}">Restablecer Contraseña</a>
             <p>Este enlace será válido por una hora.</p>`,
    });

    console.log('Correo enviado: %s', info.messageId);

    return { success: true, token };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error };
  }
}
*/