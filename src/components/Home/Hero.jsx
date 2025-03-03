import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import TypingEffect from "react-typing-effect";

const backgroundUrl = "https://i.imgur.com/kAAoWpn.png";

const Hero = () => {
  return (
    <section className="relative text-white h-screen">
      {/* Imagen de fondo optimizada */}
      <div
        className="absolute inset-0 bg-gray-900 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url(${backgroundUrl})`, opacity: 1 }}
        role="img"
        aria-label="Imagen de fondo con jugadoras de fútbol"
      ></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col justify-center h-screen max-w-[1500px] mx-auto text-center px-6">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold md:py-6">
          Promesas a la Cancha
        </h1>

        <div className="flex justify-center items-center">
          <p className="text-xl sm:text-4xl md:text-5xl font-bold py-4">
            Desata tu
          </p>
          <TypingEffect
            className="text-xl sm:text-4xl md:text-5xl font-bold md:pl-4 pl-2"
            text={["talento", "espíritu", "potencial"]}
            speed={100}
            eraseSpeed={60}
            eraseDelay={1000}
            typingDelay={500}
            loop
          />
        </div>

        <p className="text-xl md:text-2xl font-bold">
          Empieza tu carrera deportiva ahora
        </p>

        <Link to="/login">
          <button className="group bg-green-600 text-white px-8 py-4 rounded-lg my-6 mx-auto font-semibold shadow-lg hover:bg-green-500 transition-all duration-300 flex items-center gap-2">
            Comienza ahora
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Capa oscura para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </section>
  );
};

export default Hero;
