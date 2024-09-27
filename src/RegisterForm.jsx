import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const RegisterForm = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 p-0" fluid>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Regístrate</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmedPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirma la contraseña" required/>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Registrar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;