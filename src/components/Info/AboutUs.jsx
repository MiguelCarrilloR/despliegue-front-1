import React from "react";

/**
 * @function AboutUs
 * @description Componente que representa la sección superior de la página "Sobre nosotros".
 * Muestra el nombre del proyecto, un título y una breve descripción del equipo.
 * @returns {JSX.Element} Componente de la sección superior.
 */
const AboutUs = () => {
  return (
    <div className="w-full bg-white py-16 px-4 my-2.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col justify-center items-center">
          <p className="text-green-700 font-bold mt-2 text-center">
            Promesas a la Cancha
          </p>
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
            Sobre nosotros
          </h1>
          <p className="text-center">
            Somos un equipo de desarrolladores en octavo semestre de Ingeniería
            de Sistemas, unidos por una pasión compartida por la tecnología y el
            fútbol. Creemos firmemente en el poder del deporte para transformar
            vidas y en el potencial de la tecnología para crear oportunidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
