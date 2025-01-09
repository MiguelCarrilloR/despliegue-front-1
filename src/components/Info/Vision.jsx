import React from "react";

/**
 * @function Vision
 * @description Componente que presenta la visión de la organización,
 * incluyendo un texto descriptivo y una imagen representativa.
 * @returns {JSX.Element} Componente que renderiza la visión de la organización.
 */
const Vision = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-green-700">
            Nuestra Visión
          </h1>
          <p className="text-center">
            Visualizamos un futuro en el que nuestra plataforma sea el punto de
            referencia para la búsqueda y desarrollo de talento futbolístico, no
            solo en Bogotá sino también en otras regiones. Aspiramos a ser
            reconocidos por nuestra innovación y compromiso con el desarrollo
            del deporte femenino.
          </p>
        </div>
        <img
          className="w-[500px] mx-auto my-4 rounded-lg"
          src={"https://i.imgur.com/4sCLOFK.jpg"}
          alt="Visión de la organización"
        />
      </div>
    </div>
  );
};

export default Vision;
