import React from "react";
import Footer from "../components/Footer/Footer";
import NavbarDashboard from "../components/Navbar/NavbarDashboard";
import PlayerForm from "../components/Player/PlayerForm";

/**
 * Componente de perfil del jugador.
 * Renderiza la barra de navegación, el componente de boletín (Newsletter)
 * y el pie de página.
 *
 * @component
 * @returns {JSX.Element} - Renderiza el perfil del jugador con su contenido.
 */
function CompleteProfilePlayerPage() {
  return (
    <>
      <NavbarDashboard />
      <PlayerForm />
      <Footer />
    </>
  );
}

export default CompleteProfilePlayerPage;
