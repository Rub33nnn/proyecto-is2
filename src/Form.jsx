import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [login, setLogin] = useState({
    correo: '',
    contrasena: ''
  });

  const navigate = useNavigate();


  // Verifica si el usuario ya está logueado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/chatui'); // Redirige al chat si está logueado
    }
  }, []); // Solo ejecuta al cargar el componente


  const mandarDatos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/login/${login.correo}`);
      console.log('Respuesta de la BD', response.data);

      if (response.data.length > 0) {
        comprobarUsuario(response.data[0]);
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ha ocurrido un error en la conexión');
    }
  };

  const comprobarUsuario = (userData) => {
    console.log('Datos ingresados:', login);
    console.log('Datos recibidos:', userData);

    if (userData.email === login.correo) {
      if (userData.password === login.contrasena) {
        alert('Iniciando Sesión');
        localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado de sesión
        localStorage.setItem("ucorreo",login.correo); //Nomas lo puse para el correo global
        navigate('/chatui'); // Redirige al chat
      } else {
        alert('Contraseña incorrecta');
      }
    } else {
      alert('Correo incorrecto');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 p-0" fluid>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Inicia sesión</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  required
                  name="correo"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  name="contrasena"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCheckbox">
                <Form.Check type="checkbox" label="Recuérdame" />
              </Form.Group>
              <span>
                ¿Haz olvidado tu contraseña? <Link to="/recover">Click aquí</Link>
              </span>
              <Button variant="primary" className="w-100 mb-3 mt-3" onClick={mandarDatos}>
                Iniciar sesión
              </Button>
            </Form>
            <span>
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </span>
            <span>
              {' '}
              <Link to="/delete">¿Eliminar cuenta?</Link>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
