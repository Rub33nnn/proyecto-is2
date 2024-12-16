import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./ChatUI/LandingPage";
import LoginPage from "./Form";
import RegisterPage from "./RegisterForm";
import HeaderChatUI from "./ChatUI/UI";
import RecoverPass from "./Recover";
import ResetPassword from "./Reset";
import DeleteAccount from "./Delete";
import Perfil from "./ChatUI/Perfil";
import Configuracion from "./ChatUI/Configuracion";
<<<<<<< HEAD
import PrivateRoute from "./PrivateRoute"; // Se importa el componente para proteger rutas privadas
import { AppContext } from "./ChatUI/AppContext";

function App() {
  return (
    <AppContext>
      <Router>
        <Routes>
          {/* SE VEN MAMONSÍSIMOS ESTOS COMENTARIOS - 15/12 3:22 AM */}

          {/* Página principal */}
          <Route path="/" element={<LandingPage />} />

          {/* Página de inicio de sesión */}
          <Route path="/login" element={<LoginPage />} />

          {/* Página de registro */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Página de la UI para los chats: solo accesible si hay sesión activa */}
          <Route
            path="/chatui"
            element={
              <PrivateRoute>
                <HeaderChatUI />
              </PrivateRoute>
            }
          />

          {/* Recuperación de contraseña */}
          <Route path="/recover" element={<RecoverPass />} />

          {/* Restablecimiento de contraseña */}
          <Route path="/reset" element={<ResetPassword />} />

          {/* Eliminación de cuenta */}
          <Route path="/delete" element={<DeleteAccount />} />

          {/* Perfil del usuario: solo accesible si hay sesión activa */}
          <Route
            path="/Perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />

          {/* Configuración del usuario: solo accesible si hay sesión activa */}
          <Route
            path="/Configuracion"
            element={
              <PrivateRoute>
                <Configuracion />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AppContext>
=======
import PrivateRoute from "./PrivateRoute"; // Importamos el componente para proteger rutas privadas

function App() {
  return (
    <Router>
      <Routes>
        {/* SE VEN MAMONSÍSIMOS ESTOS COMENTARIOS - 15/12 3:22 AM */}

        {/* Página principal */}
        <Route path="/" element={<LandingPage />} />

        {/* Página de inicio de sesión */}
        <Route path="/login" element={<LoginPage />} />

        {/* Página de registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Página de la UI para los chats: solo accesible si hay sesión activa */}
        <Route
          path="/chatui"
          element={
            <PrivateRoute>
              <HeaderChatUI />
            </PrivateRoute>
          }
        />

        {/* Recuperación de contraseña */}
        <Route path="/recover" element={<RecoverPass />} />

        {/* Restablecimiento de contraseña */}
        <Route path="/reset" element={<ResetPassword />} />

        {/* Eliminación de cuenta */}
        <Route path="/delete" element={<DeleteAccount />} />

        {/* Perfil del usuario: solo accesible si hay sesión activa */}
        <Route
          path="/Perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        {/* Configuración del usuario: solo accesible si hay sesión activa */}
        <Route
          path="/Configuracion"
          element={
            <PrivateRoute>
              <Configuracion />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
>>>>>>> d7f84b26fcc536c6de567c2fd000724fed94b76e
  );
}

export default App;
