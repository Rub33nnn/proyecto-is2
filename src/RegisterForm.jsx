import React, {useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
const RegisterForm = () => {

  const [Register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    confpassword: "",
  })
  const navigate = useNavigate()

  const addUser = () =>{
    if(Register.password.length >= 8){
      if(Register.password == Register.confpassword){
        alert("Usuario " + Register.username + " Registrado")
        axios.post(apiUrl + '/api/login/', Register).then(() =>{
        alert("Usuario añadido, por favor inice sesion con su usuario")
        navigate("/login")
      })
      //Y ya aqui hacen para pasar a la pantalla inicial
      }else{
        alert("Las contraseñas no coinciden")
      }
    }else{
      alert("La contraseña tiene que tener minimo 8 caracteres");
    }
  }

  const handleChange = (e) => { //Con este metodo se guardan los datos del formulario, no se como funciona me lo encontre por ahi
    const { name, value } = e.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 p-0" fluid>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Regístrate</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" required name = "username" onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" required name='email' onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" required name='password' onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmedPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirma la contraseña" required name='confpassword' onChange={handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3" onClick={addUser}>
                Registrar
              </Button>
            </Form>
            <Link to="/login">Volver al inicio de sesión</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;