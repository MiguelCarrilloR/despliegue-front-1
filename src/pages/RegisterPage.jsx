import React from "react";
import NavbarLogin from "../components/Navbar/NavbarLogin";
import Footer from "../components/Footer/Footer";
import RegisterForm from "../components/Register/RegisterForm";

/**
 * Componente que representa la página de registro de usuarios.
 * Incluye la barra de navegación, el formulario de registro y el pie de página.
 *
 * @component
 * @returns {JSX.Element} - Renderiza la página de registro.
 */
function RegisterPage() {
  return (
    <>
      <NavbarLogin />
      <RegisterForm />
      <Footer />
    </>
  );
}

export default RegisterPage;
