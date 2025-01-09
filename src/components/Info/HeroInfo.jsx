import React from "react";

/**
 * @function HeroInfo
 * @description Componente que presenta información sobre el equipo,
 * destacando la pasión por la tecnología y el fútbol.
 * @returns {JSX.Element} Componente que renderiza la sección "Sobre Nosotros".
 */
const HeroInfo = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img
          className="w-[500px] mx-auto my-4 rounded-lg"
          src={"https://i.imgur.com/wutPOzL.jpg"}
          alt="Equipo de Ingenieros de Sistemas"
        />
        <div className="flex flex-col justify-center">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-green-700">
            Sobre Nosotros
          </h1>
          <p>
            Somos un equipo de Ingenieros de Sistemas, unidos por una pasión
            compartida por la tecnología y el fútbol. Creemos firmemente en el
            poder del deporte para transformar vidas y en el potencial de la
            tecnología para crear oportunidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroInfo;
