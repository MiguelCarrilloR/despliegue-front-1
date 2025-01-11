import React from "react";

/**
 * @function HeroInfo
 * @description Componente que presenta información sobre la plataforma,
 * destacando las oportunidades para jugadoras, como subir videos, obtener un porcentaje de aceptación basado en sus habilidades, 
 * y ser contactadas por reclutadores.
 * @returns {JSX.Element} Componente que renderiza la sección de introducción para jugadoras interesadas.
 */
const HeroInfo = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Impulsa tu carrera en el fútbol femenino
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comparte tus habilidades y destaca ante reclutadores y entrenadores, ¡conoce tus posibilidades de crecimiento!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Sube tus videos y demuestra tu talento</h3>
            <p className="text-lg text-gray-600 mt-2">
              Sube tus videos de partidos y entrenamientos para ser vista por reclutadores y entrenadores de todo el país.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Obtén un porcentaje de aceptación</h3>
            <p className="text-lg text-gray-600 mt-4">
              Basado en tus características físicas y técnicas, recibirás un porcentaje que te ayudará a entender tu perfil como jugadora.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Conecta con reclutadores y entrenadores</h3>
            <p className="text-lg text-gray-600 mt-4">
              Directamente a través de la plataforma, podrás ser contactada por reclutadores que buscan jugadoras con tu perfil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroInfo;
