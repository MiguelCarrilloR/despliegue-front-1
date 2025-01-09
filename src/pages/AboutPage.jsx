import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AboutUs from "../components/Info/AboutUs";
import Cards from "../components/Info/Cards";
import Mission from "../components/Info/Mission";
import Vision from "../components/Info/Vision";

/**
 * @function AboutPage
 * @description Componente que representa la página "Acerca de" de la aplicación.
 * Incluye el Navbar, secciones informativas sobre la organización y el Footer.
 * @returns {JSX.Element} Componente de la página "Acerca de".
 */
function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutUs />
      <Cards />
      <Mission />
      <Vision />
      <Footer />
    </>
  );
}

export default AboutPage;
