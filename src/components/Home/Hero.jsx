import React from "react";
import { Link } from "react-router-dom";
import TypingEffect from "react-typing-effect"; // Importar el componente

/**
 * Componente Hero que representa la sección principal de la página.
 * Muestra un video de fondo con un título, una descripción y un botón de inicio de sesión.
 *
 * @component
 * @example
 * return (
 *   <Hero />
 * )
 */
const Hero = () => {
  return (
    <div className="relative text-white h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="https://i.imgur.com/1NmTs86.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="relative z-10 max-w-[1500px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Promesas a la Cancha
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Desata tu
          </p>
          <TypingEffect
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            text={["talento", "espiritú", "potencial"]} // Pasas el texto que quieres que se teclee
            speed={100} // Velocidad de tipeo
            eraseSpeed={60} // Velocidad de borrado
            eraseDelay={1000} // Tiempo de espera antes de borrar
            typingDelay={500} // Tiempo de espera antes de empezar a teclear
            loop // Esto hace que el efecto se repita
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-white">
          Empieza tu carrera deportiva ahora
        </p>
        <Link to="/login">
          <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            Empieza ya
          </button>
        </Link>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
  );
};

export default Hero;
