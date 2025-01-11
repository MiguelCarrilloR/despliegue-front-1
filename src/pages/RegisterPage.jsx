import React from "react";
import Footer from "../components/Footer/Footer";
import RegisterForm from "../components/Register/RegisterForm";
import Navbar from "../components/Navbar/Navbar";

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
      <Navbar />
      <RegisterForm />
      <Footer />
    </>
  );
}

export default RegisterPage;
