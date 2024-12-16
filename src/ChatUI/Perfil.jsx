import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useConfiguracion } from "./AppContext";

function Perfil() {

  const { config } = useConfiguracion();

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    telefono: "",
  });
  const [fotoperfil, setfotoperfil] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerdatos = async () => {
      const correo = localStorage.getItem("ucorreo"); // Trae el correo que se usó para iniciar sesión
      try {
        const response = await axios.get(`http://localhost:3000/api/login/${correo}`); // Solicita información mediante el correo
        console.log(response.data); //Lo que se recibe de la api
        
        const { username, email, telefono } = response.data[0];

        setuserData({ username, email, telefono: telefono || "" }); // Guarda en userData
        console.log(userData); //Lo que se tiene guardado en userData

        const p_letra = username.charAt(0).toUpperCase();
        setfotoperfil(p_letra);
      } catch (error) {
        console.error("No se pudo obtener datos", error);
      }
    };
    obtenerdatos();
  }, []);

  useEffect(() => {
    if (fotoperfil) {
      localStorage.setItem("fotoperfil", fotoperfil);
    }
  }, [fotoperfil]);

  const actualizardatos = () =>{
    const correo = localStorage.getItem("ucorreo");
    const response = axios.put(`http://localhost:3000/api/login/`,userData).then(()=>{
      alert("Datos actualizados");
    });
  };

  const handleRedirect = () => {
    navigate("/chatui"); // Redirige a la página principal
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de sesión
    localStorage.removeItem('ucorreo'); // Limpia el correo almacenado
    navigate('/'); // Redirige a la pantalla de inicio de sesión
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: config.theme === "Oscuro" ? "#333" : "#fff", // Cambia el fondo según el tema
        color: config.theme === "Oscuro" ? "#fff" : "#000", // Cambia el color del texto según el tema
        fontSize: `${config.fontSize}px`, // Aplica el tamaño de fuente
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: config.theme === "Oscuro" ? "#444" : "#fff", // Fondo del contenedor
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
                backgroundColor: config.theme === "Oscuro" ? "#007bff" : "#007bff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              {fotoperfil} {/* Inicial del usuario */}
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
              value={userData.username}
              onChange={handleChange}
              name="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={userData.email}
              disabled
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="telefono">
            <Form.Label className="fw-semibold">Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Número de teléfono"
              value={userData.telefono}
              onChange={handleChange}
              name="telefono"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            className="w-100 rounded-pill fw-semibold"
            style={{ padding: "10px 0" }}
            onClick={actualizardatos}
          >
            Guardar Cambios
          </Button>
          <Button
            variant="primary"
            type="button"
            className="w-100 rounded-pill fw-semibold"
            style={{ padding: "10px 0", marginTop: "10px" }}
            onClick={handleRedirect} // Regreso a la página principal
          >
            Regresar
          </Button>
          <Button
            variant="danger"
            type="button"
            className="w-100 rounded-pill fw-semibold"
            style={{ padding: "10px 0", marginTop: "10px" }}
            onClick={handleLogout} // Llama a la función de cerrar sesión
          >
            Cerrar Sesión
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Perfil;
