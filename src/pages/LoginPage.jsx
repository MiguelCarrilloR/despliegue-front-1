import React from "react";
import NavbarLogin from "../components/Navbar/NavbarLogin";
import Footer from "../components/Footer/Footer";
import LoginForm from "../components/Login/LoginForm";

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
      <NavbarLogin />
      <LoginForm />
      <Footer />
    </>
  );
}

export default LoginPage;
