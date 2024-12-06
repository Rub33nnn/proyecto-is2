import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import 'bootstrap-icons/font/bootstrap-icons.css';

function HeaderChatUI() {
  return (
    <Container fluid className="h-100 p-0 d-flex flex-column">
      {/* Header */}
      <Row className="shadow m-0 pt-3 pb-3 align-items-center">
        <Col>
          <h3 className="fw-bold">ChatApp</h3>
        </Col>
        <Col xs="auto">
          {/* Foto de perfil con redirección */}
          <Link to="/perfil" title="Ir a tu perfil">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              A {/* Inicial del usuario */}
            </div>
          </Link>
        </Col>
      </Row>

      <Row className="flex-grow-1 m-0 h-100">
        {/* Chats Sidebar */}
        <Col xs={12} md={4} lg={3} className="bg-light p-3 shadow-sm h-100 d-flex flex-column">
          {/* Barra de búsqueda */}
          <Form className="mb-3">
            <Form.Control type="text" placeholder="Buscar..." />
          </Form>

          {/* Íconos de acciones */}
          <div className="d-flex justify-content-between mb-3">
            <i className="bi bi-chat-left-text fs-2 me-3 d-flex justify-content-center align-items-center" style={{ flex: '1 1 30%' }}></i>
            <i className="bi bi-telephone fs-2 me-3 d-flex justify-content-center align-items-center" style={{ flex: '1 1 30%' }}></i>
            <i className="bi bi-people fs-2 d-flex justify-content-center align-items-center" style={{ flex: '1 1 30%' }}></i>
          </div>

          {/* Lista de Chats */}
          <div className="mb-3">
            <h5 className="fw-bold fs-4">Chats</h5>
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div className="chat-box mb-2 p-2 border rounded d-flex align-items-center" key={i}>
              <div
                className="me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {`C${i + 1}`}
              </div>
              <div>
                <strong>Contacto {i + 1}</strong>
                <div className="text-muted">Último mensaje del contacto</div>
              </div>
            </div>
          ))}

          {/* Configuración */}
          <div className="mt-auto">
            <hr />
            <Link to="/configuracion" className="d-flex align-items-center text-decoration-none text-dark">
              <i className="bi bi-gear-fill fs-4 me-3"></i>
              <span className="fw-semibold fs-5">Configuración</span>
            </Link>
          </div>
        </Col>

        {/* Main Chat Interface */}
        <Col
          xs={12}
          md={8}
          lg={9}
          className="bg-white pr-3 pl-3 shadow-sm d-flex flex-column h-100"
          style={{ paddingBottom: "20px" }}
        >
          {/* Header de conversación */}
          <Row className="align-items-center p-3 mb-3" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <Col xs="auto">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                P
              </div>
            </Col>
            <Col>
              <div>
                <strong>Nombre del Contacto</strong>
                <div className="text-muted">Última vez activo: hace 10 minutos</div>
              </div>
            </Col>
          </Row>

          {/* Área de mensajes */}
          <div className="message-area mb-3 flex-grow-1" style={{ maxHeight: "100%", overflowY: "auto", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
            <p><strong>Contacto 1:</strong> Hola, ¿cómo estás?</p>
            <p><strong>Tú:</strong> ¡Hola! Estoy bien, gracias.</p>
            <p><strong>Contacto 1:</strong> ¿Qué has estado haciendo?</p>
          </div>

          {/* Campo de entrada */}
          <Row>
            <Col xs={10}>
              <Form.Control type="text" placeholder="Escribe un mensaje..." />
            </Col>
            <Col xs={2}>
              <Button variant="primary" className="w-100">
                <i className="bi bi-paperclip"></i> Adjuntar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderChatUI;
