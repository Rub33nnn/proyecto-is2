import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const apiUrl = import.meta.env.VITE_API_URL;

const RecoverPass = () => {
  // Estado local para manejar los datos del formulario
  const [data, setData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate(); 

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo modificado
    setData((prevState) => ({ ...prevState, [name]: value })); // Actualiza el estado local
  };

  // Funcoón generica para manejar solicitudes asincronas
  const handleRequest = async (callback) => {
    try {
      setIsSubmitting(true); // Marca el inicio del proceso
      await callback(); // Ejecuta la función pasada como argumento
    } catch (error) {
      setMessage('Error al procesar la solicitud. Intenta nuevamente.'); // Muestra mensaje de error
      console.error(error); // Imprime el error en consola
    } finally {
      setIsSubmitting(false); // Finaliza el proceso
    }
  };

  // Logica principal para recuperar la contraseña
  const handleRecover = async () => {
    const { email, newPassword, confirmPassword } = data;

    // Validacion de campos del formulario
    if (!email) {
      setMessage('El correo electronico es obligatorio.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Ejecuta la solicitud para verificar y actualizar la contraseña
    handleRequest(async () => {
      try {
        // Verifica si el correo está registrado
        const response = await axios.get(`${apiUrl}/api/login/${email}`);
        if (response.data.length > 0) {
          // Si el usuario existe, actualiza la contraseña
          const envio = { email, password: newPassword };
          await axios.put(`${apiUrl}/api/login/`, envio);
          setMessage('Contraseña restablecida exitosamente.');
          setTimeout(() => navigate('/login'), 3000); // Redirige al inicio de sesión
        } else {
          setMessage('El correo no está registrado.');
        }
      } catch (error) {
        setMessage('Error al verificar el correo. Intenta nuevamente.');
        console.error(error);
      }
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 p-0" fluid>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Restablecer contraseña</h2>
            {message && <div className="alert alert-info">{message}</div>} {/* Muestra mensajes de estado */}
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  name="email"
                  onChange={handleChange} // Maneja los cambios en este campo
                  value={data.email}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  name="newPassword"
                  onChange={handleChange}
                  value={data.newPassword}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirma tu nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={data.confirmPassword}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100 mb-3 mt-3"
                onClick={handleRecover} // Llama a la funcion para restablecer contraseña
                disabled={isSubmitting} // Deshabilita el boton mientras se procesa la solicitud
              >
                {isSubmitting ? 'Procesando...' : 'Restablecer contraseña'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoverPass;
