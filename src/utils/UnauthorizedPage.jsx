import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


const MultipleShadow = (length) => {
  let value = '2px -1px 0 #000';
  for (let i = 2; i <= length; i++) {
    const ho = i * 2;
    const vo = -(ho / 2);
    const col = `hsl(0deg, 0%, ${i * 2}%)`;
    value += `, ${ho}px ${vo}px 0 ${col}`;
  }
  return value;
};

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
    <div className="flex justify-center items-center h-screen bg-white-800">
      <div className="text-center">
        <div
          className="number font-extrabold text-white text-[30vmin] leading-none tracking-[5vmin] relative"
          style={{
            textShadow: MultipleShadow(8),
          }}
        >
          
        </div>
        <div className="text-6xl font-semibold text-black">
          <span className="text-[10vmin] block">¡Estás en fuera de juego!</span>
        </div>
        <Link to="/" className="text-lg text-lime-500 hover:text-indigo-400 mt-4 block">
        Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
