import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import "bootstrap-icons/font/bootstrap-icons.css";
import { useConfiguracion } from "./AppContext"; // Importamos el contexto para el tema y tamaño de fuente
import axios from 'axios'
import { DateTime } from 'luxon';


const apiUrl = import.meta.env.VITE_API_URL;
function HeaderChatUI() {
  const { config } = useConfiguracion(); // Accedemos al contexto para obtener el tema y tamaño de fuente
  const [chats, setChats] = useState([]); // Estado para almacenar los chats
  const [mensajes, setMensajes] = useState([]); //Genera una instancia para guardar los mensajes re
  const [nuevoMensaje, setNuevoMensaje] = useState(""); // Estado para el nuevo mensaje
  const fotoPerfil = localStorage.getItem("fotoperfil"); // Jala la "foto de perfil" de el inicio de sesion
  const [conectadoCon, setConectadoCon] = useState(null); //Se establece una instancia para guardar el otro participante
  const [searchQuery, setSearchQuery] = useState(""); //Genera una instancia para las busquedas
  const [nombreUsuario, setNombreUsuario] = useState(""); //Genera una instancia para el nombre de usuario

  const [showPopup, setShowPopup] = useState(false);


  const recuperar_chats = async () => {
    const id_user = localStorage.getItem("id_user"); // ID del usuario actual
    try {
      const response = await axios.get(`${apiUrl}/api/login/obtenerconversacion/${id_user}`); //Manda llamar el endpoint para recuperar conversaciones
      setChats(response.data); // Actualiza los chats procesados
    } catch (error) {
      console.error("ERROR AL RECUPERAR LOS CHATS", error);
    }
  };

  useEffect(() => {
    recuperar_chats(); //siempre se carga esta funcion para poder mostrar los chats del usuario

    const fecthMessages = async () => { //se hace una funcion asincrona para poder estar repitiendo los procesos
      const id_chat = localStorage.getItem("idchat"); //se trae el idchat global
      recuperar_mensajes(id_chat); //siempre se ejecuta el recuperar mensajes con el id_chat
      const id_user = localStorage.getItem("id_user"); //se manda llamar ek id_user
      recuperar_chats(id_user); //Siempre se ejecuta el recuperar chats con el id_user
    }

    const interval = setInterval(fecthMessages, 1000); //se genera un intervalo mediante la funcion de arriba y los milisegundos

    return () => setInterval(interval) //Retorna el setInterval con el interval asignado arriba
  }, []);

  const enviar_mensaje = async () => {
    const id_chat = localStorage.getItem("idchat"); //Se manda llamar LS del id_chat
    const id_user = localStorage.getItem("id_user"); //Se manda llamar el SL del id_user
    if (nuevoMensaje.trim() === "") return; //Si nuevo mensaje esta en blanco pues te retorna

    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");


    try {
      await axios.post(`${apiUrl}/api/login/enviarmensaje`, { //Le manda los parametros de los mensajes, los cuales son los de abajo en base al modelo de la api
        conversation_id: id_chat,
        userid: id_user,
        txt_message: nuevoMensaje,
        fechadeenvio: fechaActual
      });
      setNuevoMensaje(""); //Y setea el campo de nuevo mensaje en blanco
      console.log("MENSAJE ENVIADO");
    } catch (error) {
      console.error("ERROR AL ENVIAR MENSAJE", error);
    }
  };


  const recuperar_mensajes = async (id_chat) => { //Esta es la funcion para recuperar mensajes
    localStorage.setItem("idchat", id_chat) //Jala del SL el id_chat 
    try {
      const response = await axios.get(`${apiUrl}/api/login/obtenermensajes/${id_chat}`); //Manda llamar a la api con obtener mensajes y el id del chat
      console.log(response.data);

      setMensajes(response.data); //Los setea en el arreglo formulado antes

      const chat = chats.find(chat => chat.id === id_chat); //Hace un find del arreglo de chats
      const id_usuario = localStorage.getItem("id_user"); //Jala del SL el id_user
      const personaConectada = chat.idusuarioparticipante1 == id_usuario //generar una instancia para poder hacer un condicional de si el id del participante y el del usuario
        ? chat.participante2 //Se asigna el nombre del participante2
        : chat.participante1; //Se asigna el nombre del participante1

      setConectadoCon(personaConectada); //Se setea a la instancia de conectadoCon
    } catch (error) {
      console.error("ERROR AL RECUPERAR LOS MENSAJES", error);
    }
  };

  const crearchat = async (usernamebuscar) => {
    let userid1 = localStorage.getItem('id_user')
    let userid2
    try {
      const response = await axios.get(`${apiUrl}/api/login/getUSerbyName/${usernamebuscar}`)
      let user = response.data
      if (Array.isArray(response.data) && response.data.length > 0) {
        const userData = response.data[0]; // Obtén el primer elemento del array
        console.log(userData); // Imprime el objeto completo

        // Accede a valores específicos
        userid2 = userData.id
      } else {
        alert("No se encontraron datos para este usuario.");
      }
    } catch (e) {
      console.log(e)
    }

    try {
      const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
      let fechaactualizado
      const response = await axios.post(`${apiUrl}/api/login/crearconversacion`, {
        titulo: '',
        idusuarioparticipante1: userid1,
        idusuarioparticipante2: userid2,
        fecha_creacion: fechaActual,
        fechaactualizado: fechaactualizado
      })
      console.log('Conversacion creada')
    } catch (err) {
      console.log("No se pudo crear la conversacion por que ", err)
    }

    /*
      titulo:{ //Los campos deben tener exactamente los mismos nombres que tienen en la BD
        type: DataTypes.STRING
    },
    idusuarioparticipante1:{
        type: DataTypes.STRING
    },
    idusuarioparticipante2:{
        type:DataTypes.STRING
    },
    fecha_creacion:{
        type:DataTypes.STRING
    },
    fechaactualizado:{
        type:DataTypes.STRING
    }
    */



  }

  const filteredChats = chats.filter((chat) => { //Funcion de filtrar los chats
    const id_user = localStorage.getItem("id_user");
    const participant = id_user == chat.idusuarioparticipante1 //Hace una condicion de si el id_user es igual al de id usaurio participante 1
      ? chat.participante2 //Asigna en participant el participante2
      : chat.participante1; //Asigna en participant el participante1
    return participant.toLowerCase().includes(searchQuery.toLowerCase()); //Retorna el participante, incluyendo el campo de busqueda, todo eso en minisculas.
  });


  const clickchatApp = () => {
    localStorage.removeItem("idchat");
    window.location.reload();
  };

  return (
    <Container
      fluid
      className="h-100 p-0 d-flex flex-column"
      style={{
        backgroundColor: config.theme === "Oscuro" ? "#333" : "#fff", // Cambia el fondo según el tema
        color: config.theme === "Oscuro" ? "#fff" : "#000", // Cambia el color del texto según el tema
      }}
    >
      {/* Header */}
      <Row className="shadow m-0 pt-3 pb-3 align-items-center">
        <Col>
          <h3
            style={{
              cursor: "pointer"
            }}
            onClick={clickchatApp}
            className="fw-bold"
          >ChatApp</h3>
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
              {fotoPerfil} {/* Inicial del usuario */}
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
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={searchQuery} //Le asigna el valor de search query
              onChange={(e) => setSearchQuery(e.target.value)} //Cuando cambia manda llamar el setSearchQuery
            />
          </Form>

          {/* Íconos de acciones */}
          <div className="d-flex justify-content-between mb-3">
            <i
              className="bi bi-chat-left-text fs-2 me-3 d-flex justify-content-center align-items-center"
              style={{
                flex: "1 1 30%",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "none";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
              title="Conversaciones"
            ></i>
            <i
              className="bi bi-plus-circle fs-2 me-3 d-flex justify-content-center align-items-center"
              style={{
                flex: "1 1 30%",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "none";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
              title="Nueva conversación"
              onClick={() => setShowPopup(true)} // Abre el popup
            ></i>
            {showPopup && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "400px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <h5>Crear Nueva Conversación</h5>
                  <br />
                  <form>
                    <div style={{ marginBottom: "10px" }}>
                      <label htmlFor="usernameOrEmail">Nombre de usuario o correo:</label>
                      <input
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        type="text"
                        placeholder="Ingrese el usuario..."
                        id="usernameOrEmail"
                        name="usernameOrEmail"
                        style={{
                          width: "100%", padding: "8px", marginTop: "5px",
                          backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                          color: config.theme === "Oscuro" ? "#fff" : "#000",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                    <button type="button"
                      onClick={() => crearchat(nombreUsuario)}
                      style={{
                        marginBottom: "10px",
                        backgroundColor: config.theme === "Oscuro" ? "#007bff" : "#007bff",
                        color: config.theme === "Oscuro" ? "#fff" : "#fff",
                      }}

                    >
                      Agregar Chat
                    </button>
                  </form>
                  <button
                    onClick={() => setShowPopup(false)} // Cerrar el popup
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Lista de Chats */}
          <div className="flex-grow-1 overflow-auto">
            {filteredChats.length > 0 ? ( //Verificamos que chats filtrados tenga algo minimamente 
              filteredChats.map((chat) => { //Usando el map, manejamos el arreglo mediante asignacion a chat
                const id_user = localStorage.getItem("id_user"); //Jala del SL el id_user
                return (
                  <div
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = "none";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                    key={chat.id} //Usa el chat.id como llave de movimiento
                    className="chat-item mb-2 p-3 d-flex align-items-center justify-content-between"
                    style={{
                      backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                      color: config.theme === "Oscuro" ? "#fff" : "#000",
                      borderRadius: "5px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    }}
                    onClick={() => recuperar_mensajes(chat.id)} //Cuando se de click se manda llamar a recuperar mensajes
                  >
                    <div>
                      <h6 className="mb-1 fw-bold">
                        {id_user == chat.idusuarioparticipante1 ? chat.participante2 : chat.participante1} {/*En este area se hace una condicion para saber que nombre mostrar*/}
                      </h6>
                      <small>{chat.titulo}</small> {/*Aqui se muestra el ultimo mensaje por medio de titulo que se asigna por un trigger */}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No hay chats</p>
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
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transición suave al cambiar de tema
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "none";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
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
            </Col>
            <Col>
              <div>
                <strong>{conectadoCon}</strong>
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
            {mensajes.length > 0 ? ( //Primero verifica que mensajes no este vacio
              mensajes.map((mensaje) => ( //Genera un map para manejar el arreglos de mensajes
                <div
                  key={mensaje.id} //Usa el mensaje_id como la llave de movimiento
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
                    wordWrap: "break_word",
                    flexGrow: 0,
                  }}
                >
                  {/* Nombre del remitente */}
                  <small className="fw-bold d-block">
                    {mensaje.username} {/*Usa el username que recibo de la funcion para asi poder mostrarlo*/}
                  </small>
                  <p className="mb-0">{mensaje.txt_message}</p> {/*Muestra el mensaje osease el cuerpo del mensaje*/}
                  <small className="text-muted">
                    {new Date(mensaje.fechadeenvio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} {/*Muestra la fecha en la que se envio*/}
                  </small>
                </div>
              ))
            ) : ( //De ahi si no jala ningun mensaje nos muestra el nombre de la app
              <div
                className="message-area mb-3 flex-grow-1"
                style={{
                  maxHeight: "100%",
                  overflowY: "auto",
                  borderRadius: "5px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center", // Centra el contenido
                  alignItems: "center",
                  color: config.theme === "Oscuro" ? "#fff" : "#000", // Color de texto según el tema
                  fontSize: "60px",
                  textAlign: "center",
                  marginTop: "27%"
                }}
              >
                <strong><p>
                  ChatApp
                </p></strong>
              </div>
            )}
          </div>

          {/* Campo de entrada */}
          <Row className="pt-2 pb-3">
            <Col xs={10} className="d-flex">
              <Form.Control
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    enviar_mensaje();
                  }
                }
                }
                type="text"
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder="Escribe un mensaje..."
                style={{
                  backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff", // Fondo de la caja de texto
                  color: config.theme === "Oscuro" ? "#fff" : "#000", // Color del texto
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col xs={2} className="d-flex align-items-center">
              <Button
                variant="primary"
                onClick={enviar_mensaje}
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
