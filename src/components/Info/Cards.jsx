import React from "react";
import { Link } from "react-router-dom";

/**
 * @function Cards
 * @description Componente que muestra una tarjeta para cada miembro del equipo,
 * incluyendo su nombre, foto y detalles académicos.
 * @returns {JSX.Element} Componente que renderiza las tarjetas de los miembros del equipo.
 */
const Cards = () => {
  // Datos de los miembros del equipo
  const teamMembers = [
    {
      name: "Miguel Carrillo",
      image: "https://i.imgur.com/aUlDILU.jpg",
      description: "Estudiante de Ingeniería de Sistemas",
      semester: "Noveno Semestre",
      university: "Universidad El Bosque",
      linkedIn: "https://www.linkedin.com/in/miguel-carrillo-romero-5503562b4/",
    },
    {
      name: "Santiago Dávila",
      image: "https://i.imgur.com/8jBk1au.jpg",
      description: "Estudiante de Ingeniería de Sistemas",
      semester: "Noveno Semestre",
      university: "Universidad El Bosque",
      linkedIn: "https://www.linkedin.com/in/santiago-davila-99451a258/",
    },
  ];

  return (
    <section
      className="w-full py-20 px-4 bg-gray-50"
      aria-labelledby="team-section-title"
    >
      <div className="max-w-[1240px] mx-auto text-center">
        <h2
          id="team-section-title"
          className="text-4xl font-extrabold text-gray-800 mb-10"
        >
          Conoce a nuestro equipo
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full shadow-lg flex flex-col items-center p-6 bg-white rounded-lg transform hover:scale-105 transition duration-300"
            >
              {/* Imagen del miembro */}
              <img
                className="w-32 h-32 object-cover rounded-full border-4 border-green-700 shadow-md"
                src={member.image}
                alt={`Foto de ${member.name}`}
              />

              {/* Información del miembro */}
              <h3 className="text-2xl font-bold text-gray-800 mt-6">
                {member.name}
              </h3>
              <div className="text-gray-600 text-sm leading-6 mt-4 space-y-2">
                <p className="font-medium">{member.description}</p>
                <p>{member.semester}</p>
                <p>{member.university}</p>
              </div>

              {/* Botón de contacto */}
              <Link to={member.linkedIn} target="_blank">
                <button
                  className="mt-6 bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Contáctame
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
