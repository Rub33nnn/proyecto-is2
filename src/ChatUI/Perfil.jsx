import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    telefono: ""
  });
  const [fotoperfil,setfotoperfil] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerdatos = async () => {
      
      const correo = localStorage.getItem("ucorreo"); //Trae el correo que se uso para iniciar sesion
      try {
        const response = await axios.get(`http://localhost:3000/api/login/${correo}`); //Manda por la informacion por medio del correo
        const { username, email, telefono } = response.data[0];

        setuserData({ username ,email, telefono: telefono || ""}); //Guarda en UserData

        const p_letra = username.charAt(0).toUpperCase();
        setfotoperfil(p_letra);

      } catch (error){
        console.error("No se pudo obtener datos",error);
      }
    };
    obtenerdatos();
  }, []);

  useEffect(() => {
    if (fotoperfil) {
      localStorage.setItem("fotoperfil", fotoperfil);
    }
  }, [fotoperfil]);

  const handleRedirect = () => {
    navigate('/chatui') //Te manda a la pagina principal
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setuserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

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
              value={userData.username} //Le asigno el valor de username de UserData
              onChange={handleChange}
              className="rounded-pill"
              name = "username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Correo electrónico" 
              value={userData.email}
              onChange={handleChange}
              className="rounded-pill" 
              disabled
              name = "email"

            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="telefono">
            <Form.Label className="fw-semibold">Teléfono</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Número de teléfono" 
              value={userData.telefono}
              onChange={handleChange}
              className="rounded-pill" 
              name = "telefono"
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
          <Button 
            variant="primary" 
            type="button" 
            className="w-100 rounded-pill fw-semibold"
            style={{ padding: "10px 0", marginTop: "10px"}}
            onClick={handleRedirect} //Mando llamar para regresarme a la pgina principal
          >
            Regresar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Perfil; 
