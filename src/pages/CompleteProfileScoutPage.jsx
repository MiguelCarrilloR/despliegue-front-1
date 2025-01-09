import React from "react";
import NavbarDashboard from "../components/Navbar/NavbarDashboard";
import Footer from "../components/Footer/Footer";
import ScoutForm from "../components/Scout/ScoutForm";

/**
 * Componente que representa el perfil de un scout.
 * Renderiza la barra de navegación, el formulario de scout y el pie de página.
 *
 * @component
 * @returns {JSX.Element} - Renderiza el perfil del scout.
 */
function CompleteProfileScoutPage() {
  return (
    <>
      <NavbarDashboard />
      <ScoutForm />
      <Footer />
    </>
  );
}

export default CompleteProfileScoutPage;
