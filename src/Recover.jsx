import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import axios from 'axios';  

const apiUrl = import.meta.env.VITE_API_URL;
const RecoverPass = () => {
  const [email, setEmail] = useState('');  // Estado para almacenar el correo
  const [message, setMessage] = useState('');  // Estado para almacenar mensajes de éxito/error
  const navigate = useNavigate();  // Hook para redirigir a otra página

  const handleRecover = async () => {
    try {
      // Aquí envías el correo al backend para la recuperación de contraseña
      const response = await axios.post(`${apiUrl}/api/login/recover/${email}`);
      setMessage(response.data.message);

      sessionStorage.setItem('email',email)
      // Redirigir a la página de "Reset"
      if (response.data.message) {
        setTimeout(() => {
          navigate('/Reset');  // Aquí colocas la ruta de la pantalla de restablecimiento
        }, 2000);  // Espera de 2 segundos antes de redirigir
      }

    } catch (error) {
      setMessage('Error al enviar el enlace de recuperación. Por favor, intenta nuevamente.');
      console.log(error);
    }
  };
  
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 p-0" fluid>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Recuperar contraseña</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  required 
                />
              </Form.Group>
              <Button variant="primary" className="w-100 mb-3 mt-3" onClick={handleRecover}>
                Enviar enlace de recuperación
              </Button>
            </Form>
            <Link to="/login">Volver al inicio de sesión</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoverPass;
