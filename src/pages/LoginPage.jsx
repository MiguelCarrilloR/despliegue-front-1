import React from "react";
import Footer from "../components/Footer/Footer";
import LoginForm from "../components/Login/LoginForm";
import Navbar from "../components/Navbar/Navbar";

/**
 * Componente LoginPage que representa la página de inicio de sesión.
 * Incluye la barra de navegación, el formulario de inicio de sesión y el pie de página.
 *
 * @component
 * @example
 * return (
 *   <LoginPage />
 * )
 */
function LoginPage() {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
}

export default LoginPage;
