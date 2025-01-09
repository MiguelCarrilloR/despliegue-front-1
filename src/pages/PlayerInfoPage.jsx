import React from "react";
import TopInfo from "../components/Info/TopInfo";
import HeroInfo from "../components/Info/HeroInfo";
import Info from "../components/Info/Info";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

/**
 * @function AboutPlayers
 * @description Componente que representa la página "Sobre los Jugadores",
 * incluyendo la barra de navegación, secciones de análisis e información,
 * y el pie de página.
 * @returns {JSX.Element} Componente que renderiza la página de información sobre los jugadores.
 */
function PlayerInfoPage() {
  return (
    <>
      <Navbar />
      <TopInfo />
      <HeroInfo />
      <Info />
      <Footer />
    </>
  );
}

export default PlayerInfoPage;
