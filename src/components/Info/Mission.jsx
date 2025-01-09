import React from "react";

/**
 * @function Mission
 * @description Componente que presenta la misión de la organización,
 * incluyendo una imagen representativa y un texto descriptivo.
 * @returns {JSX.Element} Componente que renderiza la misión de la organización.
 */
const Mission = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img
          className="w-[500px] mx-auto my-4 rounded-lg"
          src={"https://i.imgur.com/Usj9MDp.jpg"}
          alt="Misión de la organización"
        />
        <div className="flex flex-col justify-center">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-green-700">
            Nuestra Misión
          </h1>
          <p className="text-center">
            Nuestra misión es conectar a talentosas jugadoras de fútbol con
            reclutadores y equipos, facilitando el descubrimiento y desarrollo
            de nuevas estrellas del fútbol en Bogotá. Queremos ofrecer una
            plataforma donde el talento y la oportunidad se encuentren de manera
            efectiva.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
