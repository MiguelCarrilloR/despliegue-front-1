import React from "react";
import { Link } from "react-router-dom";

/**
 * @function Info
 * @description Componente que invita a los usuarios a unirse a la comunidad,
 * proporcionando información sobre el registro y un botón para acceder a la
 * página de registro.
 * @returns {JSX.Element} Componente que renderiza la sección de información
 * para unirse a la comunidad.
 */
const Info = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-green-700">
            Únete a nuestra comunidad
          </h1>
          <p>
            No pierdas la oportunidad de ser descubierta y llevar tu carrera
            futbolística al siguiente nivel. Regístrate hoy y comienza tu camino
            hacia el éxito en el fútbol.
          </p>
          <Link to="/register">
            <button className="bg-lime-400 text-[#000] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 hover:scale-105 duration-300">
              Regístrate ya
            </button>
          </Link>
        </div>
        <img
          className="w-[500px] mx-auto my-4 rounded-lg"
          src={"https://i.imgur.com/jjYGMSt.jpg"}
          alt="Oportunidad de unirse a la comunidad"
        />
      </div>
    </div>
  );
};

export default Info;
