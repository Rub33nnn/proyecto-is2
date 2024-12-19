import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useConfiguracion } from "./AppContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Configuracion() {
  const [datos, setDatos] = useState({
    contra_actual: "",
    new_contra: "",
    c_new_contra: ""
  });

  const navigate = useNavigate();
 

  const { config, updateConfig } = useConfiguracion();

  const handleSwitchChange = (event, setting) => {
    updateConfig({ [setting]: event.target.checked });
  };

  const handleSelectChange = (event, setting) => {
    updateConfig({ [setting]: event.target.value });
  };

  const handleRedirect = () => {
    navigate("/chatui"); // Redirige a la página principal
    localStorage.removeItem("idchat");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const recepcion = async () => {
	const email = localStorage.getItem("ucorreo"); //Solicita el correo del almacenamiento local
	try {
		const response = await axios.get(`${apiUrl}/api/login/${email}`); //Solicta la informacion de usando el correo
		console.log("Respuesta BD:",response.data); //Muestra en consola, la respuesta de la BD

    //Verfica que si haya datos recibidos de la BD
		if(response.data.length > 0) { 
			cambiar_contraseña(response.data[0]) //Manda llamar ahora para cambiar la contraseña
		} else {
			alert('Sin respuesta');
      resetForm();
		}
	} catch(error){
		console.error(error);
    alert("Hubo un error en la solicitud");
    resetForm();
	}
};

const cambiar_contraseña = async (BD_Data) => {
	const email = localStorage.getItem("ucorreo");
  if(datos.new_contra.length >= 8){ //Verificador de minimo de caracteres
	  if(BD_Data.password === datos.contra_actual) { //Verifica que la contraseña actual supuesta coincida con la contraseña actual
		  if(datos.new_contra === datos.c_new_contra) { //Verifica que la contraseña nueva y su confirmacion sean correctas
			  const envio = { email, password: datos.new_contra }; //asigna en un envio, el email del usuario y las contraseña nueva
          await axios.put(`${apiUrl}/api/login/`, envio).then(() => { //Hace el put en la api para que se actualize la contraseña
          alert("Contraseña actualizada");
          resetForm();
        });
		  }else{
			  alert("Las contraseñas no coinciden");
        resetForm();
		  }
	  }else{
		  alert("La contraseña actual no coincide");
      resetForm();
	  }
  }else{
    alert("La contraseña tiene que ser minimo de 8 caracteres");
    resetForm();
  }
};

const resetForm = () => {
  setDatos({
    contra_actual: "",
    new_contra: "",
    c_new_contra: "",
  });
};

  return (
    <Container fluid className="m-0" style={{ minHeight: "100vh", backgroundColor: config.theme === "Oscuro" ? "#333" : "#fff" }}>
      {/* Botón de regresar */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={handleRedirect}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: config.theme === "Oscuro" ? "#007bff" : "#007bff",
          borderColor: config.theme === "Oscuro" ? "#007bff" : "#007bff",
        }}
      >
        Regresar
      </Button>

      {/* Título de la página */}
      <h2 className="text-center fw-bold mb-4" style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Configuración</h2>

      <Row className="justify-content-center">
        {/* Columna amplia para configuración */}
        <Col xs={12} md={10} lg={8}>
          {/* Sección: Cambiar contraseña */}
          <div className="mb-5 p-4 border rounded shadow-sm" style={{ backgroundColor: config.theme === "Oscuro" ? "#444" : "#f8f9fa" }}>
            <h5 className="fw-semibold mb-3" style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Cambiar contraseña</h5>
            <Form>
              <Form.Group controlId="formCurrentPassword" className="mb-3">
                <Form.Label style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Contraseña actual</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña actual"
                  onChange={handleChange}
                  name="contra_actual"
                  value={datos.contra_actual}
                  style={{
                    backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                    color: config.theme === "Oscuro" ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  onChange={handleChange}
                  name="new_contra"
                  value={datos.new_contra}
                  style={{
                    backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                    color: config.theme === "Oscuro" ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Confirma nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  onChange={handleChange}
                  name="c_new_contra"
                  value={datos.c_new_contra}
                  style={{
                    backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                    color: config.theme === "Oscuro" ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={recepcion}
                style={{
                  backgroundColor: config.theme === "Oscuro" ? "#007bff" : "#007bff",
                  borderColor: config.theme === "Oscuro" ? "#007bff" : "#007bff",
                  padding: "8px 10px",
                  borderRadius: "5px",
                }}
              >
                Guardar cambios
              </Button>
            </Form>
          </div>

          {/* Sección: Personalización de interfaz */}
          <div className="p-4 border rounded shadow-sm" style={{ backgroundColor: config.theme === "Oscuro" ? "#444" : "#f8f9fa" }}>
            <h5 className="fw-semibold mb-3" style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Personalización</h5>
            <Form>
              <Form.Group controlId="formTheme" className="mb-3">
                <Form.Label style={{ color: config.theme === "Oscuro" ? "#fff" : "#000" }}>Tema</Form.Label>
                <Form.Select
                  value={config.theme}
                  onChange={(e) => handleSelectChange(e, 'theme')}
                  style={{
                    backgroundColor: config.theme === "Oscuro" ? "#555" : "#fff",
                    color: config.theme === "Oscuro" ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  <option>Claro</option>
                  <option>Oscuro</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      
    </Container>
  );
}

export default Configuracion;
