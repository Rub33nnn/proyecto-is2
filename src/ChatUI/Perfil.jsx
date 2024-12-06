import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function Perfil() {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Encabezado */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">Perfil de Usuario</h2>
            <p className="text-muted">Administra y personaliza tu información</p>
          </Col>
        </Row>

        {/* Foto de Perfil */}
        <Row className="mb-4 justify-content-center">
          <Col xs="auto" className="text-center">
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "3rem",
                fontWeight: "bold",
                margin: "0 auto",
              }}
            >
              A {/* Inicial del usuario */}
            </div>
            <Button variant="link" className="mt-2 text-decoration-none text-primary fw-bold">
              Cambiar Foto
            </Button>
          </Col>
        </Row>

        {/* Formulario */}
        <Form>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label className="fw-semibold">Nombre</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Nombre completo" 
              defaultValue="Juan Pérez" 
              className="rounded-pill" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Correo electrónico" 
              defaultValue="juanperez@example.com" 
              className="rounded-pill" 
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="telefono">
            <Form.Label className="fw-semibold">Teléfono</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Número de teléfono" 
              defaultValue="+123456789" 
              className="rounded-pill" 
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 rounded-pill fw-semibold"
            style={{ padding: "10px 0" }}
          >
            Guardar Cambios
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Perfil;
