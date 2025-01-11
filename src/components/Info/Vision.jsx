import React from "react";

/**
 * @function Vision
 * @description Componente que presenta la visión de la organización,
 * incluyendo un texto descriptivo y una imagen representativa.
 * @returns {JSX.Element} Componente que renderiza la visión de la organización.
 */
const Vision = () => {
  return (
    <section
      className="w-full bg-gray-50 py-20 px-4"
      aria-labelledby="vision-title"
    >
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Texto de la visión */}
        <div className="space-y-6 text-center md:text-left">
          <h1
            id="vision-title"
            className="text-4xl font-extrabold text-green-700"
          >
            Nuestra Visión
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Visualizamos un futuro en el que nuestra plataforma sea el punto de
            referencia para la búsqueda y desarrollo de talento futbolístico,
            no solo en Bogotá sino también en otras regiones. 
          </p>
          <p className="text-gray-600 leading-relaxed">
            Aspiramos a ser reconocidos por nuestra innovación, impacto social
            y compromiso con el desarrollo del deporte femenino, promoviendo la
            igualdad de oportunidades a través de la tecnología.
          </p>
        </div>

        {/* Imagen representativa */}
        <img
          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          src="https://i.imgur.com/4sCLOFK.jpg"
          alt="Representación de la visión de la organización"
        />
      </div>
    </section>
  );
};

export default Vision;
