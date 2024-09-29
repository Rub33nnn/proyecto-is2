import React, {useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';//Esto es lo que se usa para poder hacer peticiones al backend, nomas instalenlo con la terminal

const LoginForm = () => {
  
  const [login, setLogin] = useState({ //Aqui se guarda lo que hayas puesto en el formulario
    correo: '',
    contrasena: ''
  });

  var [user, setUser] = useState({ //Aqui se guarda lo que se recibe de la base de datos
    id:0,
    username: '',
    correo: '',
    contraseña: '',
    imguser: ''
  });

  const mandarDatos = () =>{ //Este metodo es el que se comunica con el backend
    axios.get('http://localhost:3000/api/login/'+login.correo).then(function (response) { //La url es la de la api a la que se comunica y se le agrega el parametro con el que se va a hacer la consulta
      console.log("Respuesta de la BD");
      console.log(response.data); //Imprimo en consola al respuesta de la api que deberian ser los datos obtenidos de la base de datos

      setUser({ //Guardamos los datos de la repuesta en user para poder usarlas luego
        id: response.data[0].id,
        username: response.data[0].username,
        correo: response.data[0].email,
        contraseña: response.data[0].password,
        imguser: response.data[0].imguser
      })
    })

    .catch(function (error) {
      // handle error
      console.log(error);
      alert("Ha ocurrido un error" + error)
    })
    .finally(function () {
      // always executed
    });

    comprobarUsuario() //Llamamos al metodo para comprobar si los datos son correctos
  }

  const comprobarUsuario = () =>{
    if(user.correo == login.correo){ //Comparamos el correo introducido en el formulario y el de la base de datos 
      if(user.contraseña == login.contrasena){ //(Penandolo bien no tiene sentido porque si no introduces bien el correo la api no te devolvera nada pero bueno xD)
        alert("Iniciando Sesion") //A y se compara la contraseña introducida en el formulario y la que se obtuvo por medio de la consulta
      }else(alert("Usuario o contraseña incorrecta")) //Si son correctos sale esta alerta, aqui se puede agregar lo de pasar a la pagina principal y asi
    }else(alert("Usuario o contraseña incorrecta"))
  }

  const handleChange = (e) => { //Con este metodo se guardan los datos del formulario, no se como funciona me lo encontre por ahi
    const { name, value } = e.target;
    setLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 p-0" fluid>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Inicia sesión</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" required  name="correo" onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" required name="contrasena" onChange={handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCheckbox">
                <Form.Check type="checkbox" label="Recuérdame"/>
              </Form.Group>

              <Button variant="primary" type='submit' className="w-100 mb-3" onClick={mandarDatos}> 
                Iniciar sesión
              </Button>
            </Form>
            <span>¿No tienes una cuenta? <a href="#">Regístrate</a></span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
