import React from "react";
import NavbarDashboard from "../components/Navbar/NavbarDashboard";
import Footer from "../components/Footer/Footer";
import PlayerProfile from "../components/Player/PlayerProfile";

/**
 * @function PlayerDashboardPage
 * @description Componente que representa el tablero del jugador, que incluye
 * la barra de navegación, el perfil del jugador y el pie de página.
 * @returns {JSX.Element} Componente del tablero del jugador.
 */
function PlayerDashboardPage() {
  return (
    <>
      {/* Barra de navegación del jugador */}
      <NavbarDashboard/>
      {/* Perfil del jugador */}
      <PlayerProfile />
      {/* Pie de página */}
      <Footer />
    </>
  );
}

export default PlayerDashboardPage;
