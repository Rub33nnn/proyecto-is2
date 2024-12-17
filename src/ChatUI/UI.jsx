import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import "bootstrap-icons/font/bootstrap-icons.css";
import { useConfiguracion } from "./AppContext"; // Importamos el contexto para el tema y tamaño de fuente
import axios from 'axios'

function HeaderChatUI() {
  const { config } = useConfiguracion(); // Accedemos al contexto para obtener el tema y tamaño de fuente
  const [chats, setChats] = useState([]); // Estado para almacenar los chats
  const [mensajes, setMensajes] = useState([]);
  const [participantes, setParticipantes] = useState({ participante1: "", participante2: "" });

  const recuperar_chats = async () =>{
    const id = localStorage.getItem("id_user");
    try{
    const response = await axios.get(`http://localhost:3000/api/login/obtenerconversacion/${id}`);
    console.log(response.data);
    setChats(response.data); // Guardamos los chats en el estado
    }catch(error){
      console.error("ERROR AL RECUPERAR LOS CHATS",error);
    };
  };

  useEffect(() => {
    recuperar_chats();
  }, []);

  const recuperar_mensajes = async (id_chat) =>{
    const chatEncontrado = chats.find((chat) => chat.id === id_chat);
    const id_user = localStorage.getItem("id_user");
    try{
      const response = await axios.get(`http://localhost:3000/api/login/obtenermensajes/${id_chat}`);
      console.log(response.data);
      setMensajes(response.data);
      

      if(chatEncontrado.idusuarioparticipante1 === id_user){
        setParticipantes({
          participante1: "Tu",
          participante2:chatEncontrado.participante2.nombre
        });
      }else{
        setParticipantes({
          participante2: "Tu",
          participante1:chatEncontrado.participante2.nombre
        });
      };
    }catch(error){
      console.error("ERROR AL RECUPERAR LOS MENSAJES",error);
    }
  };

  return (
    <Container
      fluid
      className="h-100 p-0 d-flex flex-column"
      style={{
        backgroundColor: config.theme === "Oscuro" ? "#333" : "#fff", // Cambia el fondo según el tema
        color: config.theme === "Oscuro" ? "#fff" : "#000", // Cambia el color del texto según el tema
        fontSize: `${config.fontSize}px`, // Aplica el tamaño de fuente
      }}
    >
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
                backgroundColor:
                  config.theme === "Oscuro" ? "#007bff" : "#007bff",
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
        <Col
          xs={12}
          md={4}
          lg={3}
          className="p-3 shadow-sm h-100 d-flex flex-column"
          style={{
            backgroundColor: config.theme === "Oscuro" ? "#444" : "#f8f9fa", // Fondo lateral según el tema
          }}
        >
          {/* Barra de búsqueda */}
          <Form className="mb-3">
            <Form.Control type="text" placeholder="Buscar..." />
          </Form>

          {/* Íconos de acciones */}
          <div className="d-flex justify-content-between mb-3">
            <i
              className="bi bi-chat-left-text fs-2 me-3 d-flex justify-content-center align-items-center"
              style={{ flex: "1 1 30%" }}
            ></i>
            <i
              className="bi bi-people fs-2 d-flex justify-content-center align-items-center"
              style={{ flex: "1 1 30%" }}
            ></i>
          </div>

          {/* Lista de Chats */}
          <div className="flex-grow-1 overflow-auto">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className="chat-item mb-2 p-3 d-flex align-items-center justify-content-between"
                  style={{
                    backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                    color: config.theme === "Oscuro" ? "#fff" : "#000",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "background-color 0.3s",
                  }}
                  onClick={() => recuperar_mensajes(chat.id)}
                >
                  <div>
                    <h6 className="mb-1 fw-bold">{chat.titulo}</h6>
                    <small>
                      {chat.participante2}
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay chats disponibles</p>
            )}
          </div>

          {/* Configuración */}
          <div className="mt-auto">
            <hr />
            <Link
              to="/configuracion"
              className="d-flex align-items-center text-decoration-none"
              style={{
                backgroundColor: config.theme === "Oscuro" ? "#444" : "white", // Fondo ajustado según el tema
                color: config.theme === "Oscuro" ? "#fff" : "#000", // Color del texto según el tema
                padding: "10px 15px", // Espaciado alrededor del texto
                borderRadius: "5px", // Bordes redondeados
                transition: "background-color 0.3s", // Transición suave al cambiar de tema
              }}
            >
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
          className="shadow-sm d-flex flex-column h-100"
          style={{
            backgroundColor: config.theme === "Oscuro" ? "#333" : "#fff", // Fondo principal según el tema
            color: config.theme === "Oscuro" ? "#fff" : "#000", // Color de texto principal
          }}
        >
          {/* Header de conversación */}
          <Row
            className="align-items-center p-3 mb-3"
            style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <Col xs="auto" className="d-flex align-items-center">
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
                  marginRight: "10px",
                }}
              >
                P
              </div>
              <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: config.theme === "Oscuro" ? "#444" : "#f8f9fa",
                maxWidth: "70%", // Ajusta el ancho del cuadro si es necesario
                }}
              >
              {participantes.participante2}
              </div>
            </Col>
            <Col>
              <div>
                <strong></strong>
              </div>
            </Col>
          </Row>

          {/* Área de mensajes */}
          <div
            className="message-area mb-3 flex-grow-1"
            style={{
              maxHeight: "100%",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: config.theme === "Oscuro" ? "#444" : "#f8f9fa", // Fondo de mensajes según el tema
            }}
          >
            {mensajes.length > 0 ? (
              mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className="mb-2 p-2"
                  style={{
                    borderRadius: "5px",
                    backgroundColor:
                      mensaje.userid === localStorage.getItem("id_user")
                        ? "#007bff"
                        : "#e9ecef",
                    color:
                      mensaje.userid === localStorage.getItem("id_user")
                        ? "#fff"
                        : "#000",
                    alignSelf:
                      mensaje.userid === localStorage.getItem("id_user")
                        ? "flex-end"
                        : "flex-start",
                    maxWidth: "70%",
                  }}
                >
                  {/* Nombre del remitente */}
                    <small className="fw-bold d-block">
                      {mensaje.userid === localStorage.getItem("id_user")
                        ? "Tú"
                        : participantes.participante2}
                    </small>
                  <p className="mb-0">{mensaje.txt_message}</p>
                  <small className="text-muted">
                    {new Date(mensaje.fechadeenvio).toLocaleTimeString()}
                  </small>
                </div>
              ))
            ) : (
              <p>No hay mensajes disponibles</p>
            )}
          </div>

          {/* Campo de entrada */}
          <Row className="pt-2 pb-3">
            <Col xs={10} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Escribe un mensaje..."
                style={{
                  backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff", // Fondo de la caja de texto
                  color: config.theme === "Oscuro" ? "#fff" : "#000", // Color del texto
                  border: "1px solid #ccc", // Borde sutil
                  borderRadius: "5px", // Bordes redondeados
                }}
              />
            </Col>
            <Col xs={2} className="d-flex align-items-center">
              <Button
                variant="primary"
                className="w-100 d-flex justify-content-center align-items-center"
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  backgroundColor:
                    config.theme === "Oscuro" ? "#007bff" : "#007bff", // Mismo color en ambos modos
                  border: "none", // Elimina el borde
                  borderRadius: "5px", // Bordes redondeados
                  padding: "8px 10px", // Ajuste de padding
                }}
              >
                <i className="bi bi-send"></i> {/* Ícono de enviar */}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderChatUI;
