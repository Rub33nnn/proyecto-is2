import React from 'react';
import { Navigate } from 'react-router-dom';

/*
    MODULO CREADO PARA NO ANDAR BATALLANDO CON LA SESIÓN
    SE ENCARGA DE PROTEGER LOS ENDPOINTS PARA QUE SOLO SE PUEDA ACCEDER A ELLOS SOLO SI EXISTE UNA SESIÓN INICIADA
*/

const PrivateRoute = ({ children }) => { // Se llama children porque así lo quiso React
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Si está logeado permite acceder al endpoint

  return isLoggedIn ? children : <Navigate to="/" />; // Si no lo está redirige a la pantalla principal
};

export default PrivateRoute;
