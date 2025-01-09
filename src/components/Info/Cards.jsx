import React from "react";

/**
 * @function Cards
 * @description Componente que muestra una tarjeta para cada miembro del equipo,
 * incluyendo su nombre, foto y detalles académicos.
 * @returns {JSX.Element} Componente que renderiza las tarjetas de los miembros del equipo.
 */
const Cards = () => {
  return (
    <div className="w-full py-[10rem] px-4 bg-white">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
        {/* Tarjeta de Miguel Carrillo */}
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-30 mx-auto mt-[-9rem] bg-white rounded-lg"
            src={"https://i.imgur.com/aUlDILU.jpg"}
            alt="Miguel Carrillo"
          />
          <h2 className="text-2xl font-bold text-center py-8">
            Miguel Carrillo
          </h2>
          <div className="text-center font-medium flex-grow">
            <p className="py-2 border-b mx-8 mt-8">
              Estudiante de Ingeniería de Sistemas
            </p>
            <p className="py-2 border-b mx-8">Octavo Semestre</p>
            <p className="py-2 border-b mx-8">Universidad El Bosque</p>
          </div>
        </div>

        {/* Tarjeta de Santiago Dávila */}
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-25 mx-auto mt-[-2rem] bg-white rounded-lg"
            src={"https://i.imgur.com/8jBk1au.jpg"}
            alt="Santiago Dávila"
          />
          <h2 className="text-2xl font-bold text-center py-8">
            Santiago Dávila
          </h2>
          <div className="text-center font-medium flex-grow">
            <p className="py-2 border-b mx-8 mt-8">
              Estudiante de Ingeniería de Sistemas
            </p>
            <p className="py-2 border-b mx-8">Octavo Semestre</p>
            <p className="py-2 border-b mx-8">Universidad El Bosque</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
