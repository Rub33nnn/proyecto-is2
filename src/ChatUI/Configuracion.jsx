import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Configuracion() {
  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Título de la página */}
      <h2 className="text-center fw-bold mb-4">Configuración</h2>

      <Row className="justify-content-center">
        {/* Columna amplia para configuración */}
        <Col xs={12} md={10} lg={8}>
          {/* Sección: Cambiar nombre de usuario */}
          <div className="mb-5 p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-semibold mb-3">Cambiar nombre de usuario</h5>
            <Form>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Nombre de usuario actual</Form.Label>
                <Form.Control type="text" placeholder="Nombre actual" disabled />
              </Form.Group>
              <Form.Group controlId="formNewUsername" className="mb-3">
                <Form.Label>Nuevo nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresa el nuevo nombre" />
              </Form.Group>
              <Button variant="primary">Guardar cambios</Button>
            </Form>
          </div>

          {/* Sección: Cambiar contraseña */}
          <div className="mb-5 p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-semibold mb-3">Cambiar contraseña</h5>
            <Form>
              <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label>Contraseña actual</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña actual" />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu nueva contraseña" />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirma nueva contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirma tu nueva contraseña" />
              </Form.Group>
              <Button variant="primary">Guardar cambios</Button>
            </Form>
          </div>

          {/* Sección: Configuraciones generales */}
          <div className="mb-5 p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-semibold mb-3">Configuraciones generales</h5>
            <Form>
              <Form.Group controlId="formNotifications" className="mb-3">
                <Form.Check type="switch" label="Notificaciones activadas" />
              </Form.Group>
              <Form.Group controlId="formDarkMode" className="mb-3">
                <Form.Check type="switch" label="Modo oscuro" />
              </Form.Group>
              <Form.Group controlId="formLanguage" className="mb-3">
                <Form.Label>Idioma</Form.Label>
                <Form.Select>
                  <option>Español</option>
                  <option>Inglés</option>
                  <option>Francés</option>
                  <option>Alemán</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>

          {/* Sección: Configuración de privacidad */}
          <div className="mb-5 p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-semibold mb-3">Privacidad</h5>
            <Form>
              <Form.Group controlId="formProfileVisibility" className="mb-3">
                <Form.Label>Visibilidad de perfil</Form.Label>
                <Form.Select>
                  <option>Público</option>
                  <option>Solo amigos</option>
                  <option>Privado</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formReadReceipts" className="mb-3">
                <Form.Check type="switch" label="Mostrar confirmaciones de lectura" />
              </Form.Group>
              <Form.Group controlId="formLastSeen" className="mb-3">
                <Form.Check type="switch" label="Mostrar última conexión" />
              </Form.Group>
            </Form>
          </div>

          {/* Sección: Personalización de interfaz */}
          <div className="p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-semibold mb-3">Personalización</h5>
            <Form>
              <Form.Group controlId="formTheme" className="mb-3">
                <Form.Label>Tema</Form.Label>
                <Form.Select>
                  <option>Claro</option>
                  <option>Oscuro</option>
                  <option>Sistema</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formChatFontSize" className="mb-3">
                <Form.Label>Tamaño de fuente en los chats</Form.Label>
                <Form.Range />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Configuracion;
