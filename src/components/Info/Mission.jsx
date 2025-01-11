import React from "react";

/**
 * @function Mission
 * @description Componente que presenta la misión de la organización,
 * incluyendo una imagen representativa y un texto descriptivo.
 * @returns {JSX.Element} Componente que renderiza la misión de la organización.
 */
const Mission = () => {
  return (
    <section
      className="w-full bg-gray-50 py-20 px-4"
      aria-labelledby="mission-title"
    >
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Imagen representativa */}
        <img
          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          src="https://i.imgur.com/Usj9MDp.jpg"
          alt="Representación de la misión de la organización"
        />

        {/* Sección de texto */}
        <div className="text-center md:text-left space-y-6">
          <h1
            id="mission-title"
            className="text-4xl font-extrabold text-green-700"
          >
            Nuestra Misión
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Nuestra misión es conectar a talentosas jugadoras de fútbol con
            reclutadores y equipos, facilitando el descubrimiento y desarrollo
            de nuevas estrellas del fútbol en Bogotá. Queremos ofrecer una
            plataforma donde el talento y la oportunidad se encuentren de manera
            efectiva.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Creemos en el poder del deporte como un catalizador para la
            transformación social, y nuestro compromiso es contribuir al éxito
            de las jugadoras mediante tecnología innovadora y un enfoque
            inclusivo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
