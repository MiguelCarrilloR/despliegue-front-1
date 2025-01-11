import React from "react";
import { Star, Rocket } from "lucide-react";

/**
 * @function TopInfo
 * @description Componente que muestra la sección superior de la página,
 * incluyendo un título, un subtítulo y una descripción sobre la plataforma.
 * @returns {JSX.Element} Componente que renderiza la sección de introducción
 * de la plataforma.
 */
const TopInfo = () => {
  return (
    <section className="w-full bg-gradient-to-r from-green-50 via-white to-green-50 py-16 px-6 my-5">
      <div className="max-w-[1240px] mx-auto text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Star className="text-green-600" size={32} />
            <p className="text-green-700 font-extrabold text-xl">
              Promesas a la Cancha
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            ¡Empieza tu carrera profesional ahora!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Bienvenida a nuestra plataforma, donde tu talento futbolístico puede
            brillar y ser reconocido. Al registrarte, accederás a una red de
            reclutadores y equipos en búsqueda de jugadoras talentosas como tú.
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <Rocket className="text-green-600" size={32} />
            <p className="text-green-700 font-semibold text-lg">
              ¡Lleva tu pasión al siguiente nivel!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopInfo;
