import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Home/Hero";

/**
 * Componente Home que representa la página principal de la aplicación.
 * Incluye el Navbar, la sección Hero y el Footer.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}

export default HomePage;
