import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

/**
 * Componente que muestra un mensaje de error cuando el usuario no está autorizado.
 * Elimina el usuario del localStorage y permite al usuario regresar a la página principal.
 *
 * @component
 * @returns {JSX.Element} - Renderiza la página de no autorizado.
 */
function UnauthorizedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina el usuario del localStorage
    localStorage.removeItem("user");
  }, []);

  return (
    <div className="my-20 flex flex-col items-center">
      <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
        ¡No estás autorizado para acceder a esta página!
      </h1>
      <img
        src={"https://i.imgur.com/xK77pXI.jpg"}
        alt="Player"
        className="rounded-full w-64 h-64 object-cover shadow-lg my-8"
      />
      <button
        onClick={() => navigate("/")}
        className="bg-lime-500 text-[#000] rounded-md font-medium py-3 px-6 flex items-center hover:scale-105 duration-300"
      >
        <IoIosArrowRoundBack className="mr-2" /> Volver
      </button>
    </div>
  );
}

export default UnauthorizedPage;
