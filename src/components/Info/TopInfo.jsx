import React from "react";

/**
 * @function TopInfo
 * @description Componente que muestra la sección superior de la página,
 * incluyendo un título, un subtítulo y una descripción sobre la plataforma.
 * @returns {JSX.Element} Componente que renderiza la sección de introducción
 * de la plataforma.
 */
const TopInfo = () => {
  return (
    <div className="w-full bg-white py-16 px-4 my-2.5">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col justify-center">
          <p className="text-green-700 font-bold mt-2">Promesas a la Cancha</p>
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2">
            ¡Empieza tu carrera profesional ahora!
          </h1>
          <p>
            Bienvenida a nuestra plataforma, donde tu talento futbolístico puede
            brillar y ser reconocido. Al registrarte, accederás a una red de
            reclutadores y equipos en búsqueda de jugadoras talentosas como tú.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
