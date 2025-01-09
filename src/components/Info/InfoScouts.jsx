import React from "react";
import { Link } from "react-router-dom";

/**
 * @function InfoScouts
 * @description Componente que proporciona información para scouts,
 * destacando la oportunidad de buscar y registrar talento futbolístico en Colombia.
 * @returns {JSX.Element} Componente que muestra información y un botón de registro.
 */
const InfoScouts = () => {
  return (
    <div className="w-full bg-white py-16 px-4 my-8">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-[#00000]">
            Busca los mejores talentos del país
          </h1>
          <p className="text-lg md:text-xl">
            ¡Bienvenido, reclutador! Únete a nuestra plataforma y descubre el
            talento futbolístico que Colombia tiene para ofrecer. Con nuestras
            herramientas avanzadas de búsqueda y evaluación, podrás encontrar y
            contactar a las jugadoras más prometedoras.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="w-full h-auto rounded-lg"
            src={"https://i.imgur.com/XMVMnWd.jpg"}
            alt="Talento futbolístico"
          />
        </div>
      </div>
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-[1240px] mx-auto text-center">
          <div className="flex flex-col justify-center">
            <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-[#00000]">
              ¡Regístrate Ahora!
            </h1>
            <p>
              No dejes pasar la oportunidad de llevar a tu equipo al siguiente
              nivel con el mejor talento nacional.
            </p>
          </div>
          <Link to="/register">
            <button className="bg-lime-500 text-[#000] w-[200px] rounded-md font-medium my-6 mx-auto py-3 hover:scale-105 duration-300">
              Regístrate ya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoScouts;
