import React from "react";
import NavbarDashboard from "../components/Navbar/NavbarDashboard";
import Footer from "../components/Footer/Footer";
import ScoutFilters from "../components/Scout/ScoutFilters";

/**
 * Componente que representa el tablero de control del scout.
 * Este componente incluye la barra de navegación del jugador, los filtros para scouts y el pie de página.
 *
 * @returns {JSX.Element} El componente ScoutDashboard.
 */
function ScoutDashboardPage() {
  return (
    <>
      <NavbarDashboard />
      <ScoutFilters />
      <Footer />
    </>
  );
}

export default ScoutDashboardPage;
