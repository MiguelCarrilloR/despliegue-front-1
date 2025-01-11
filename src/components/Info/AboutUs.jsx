import React from "react";

/**
 * @function AboutUs
 * @description Componente que representa la sección "Sobre nosotros" de la página.
 * Incluye el nombre del proyecto, un título, una breve descripción del equipo y un botón de acción.
 * @returns {JSX.Element} Componente de la sección "Sobre nosotros".
 */
const AboutUs = () => {
  return (
    <section
      className="w-full bg-white py-16 px-4 my-2.5"
      aria-labelledby="about-us-title"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col justify-center items-center text-center space-y-6">
          {/* Nombre del proyecto */}
          <p className="text-green-700 font-extrabold text-lg tracking-widest">
            Promesas a la Cancha
          </p>

          {/* Título principal */}
          <h1
            id="about-us-title"
            className="md:text-6xl sm:text-5xl text-4xl font-bold py-2"
          >
            Sobre nosotros
          </h1>

          {/* Descripción */}
          <p className="text-gray-600 leading-relaxed max-w-[800px]">
            Somos un equipo de estudiantes de octavo semestre de Ingeniería de
            Sistemas, unidos por una pasión compartida por la tecnología y el
            fútbol. Creemos firmemente en el poder del deporte para transformar
            vidas y en el potencial de la tecnología para crear oportunidades
            únicas para mujeres futbolistas en Bogotá.
          </p>

          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
