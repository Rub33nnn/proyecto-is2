import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./ChatUI/LandingPage";
import LoginPage from "./Form";
import RegisterPage from "./RegisterForm";
import HeaderChatUI from "./ChatUI/UI";
import RecoverPass from "./Recover";
import ResetPassword from "./Reset";
import DeleteAccount from "./Delete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chatui" element = {<HeaderChatUI />}/>
        <Route path= "/recover" element={<RecoverPass />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/delete" element={<DeleteAccount />} />
      </Routes>
    </Router>
  );
}

export default App;

