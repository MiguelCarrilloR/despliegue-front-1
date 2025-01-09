import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import InfoScouts from "../components/Info/InfoScouts";


/**
 * @function ScoutInfoPage
 * @description Componente que representa la página "Sobre Scouts", que incluye
 * información relevante para scouts interesados en el fútbol femenino.
 * @returns {JSX.Element} Componente que renderiza la sección sobre scouts.
 */
function ScoutInfoPage() {
  return (
    <>
      <Navbar />
      <InfoScouts />
      <Footer />
    </>
  );
}

export default ScoutInfoPage;
