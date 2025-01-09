import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

/**
 * Componente Navbar que representa la barra de navegación del sitio.
 * Incluye enlaces a diferentes secciones de la aplicación y un menú móvil.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-transparent fixed w-full top-0 left-0 z-20">
      <div className="flex justify-center md:justify-between items-center h-24 max-w-[1740px] mx-auto px-4 text-black">
        <Link to="/">
          <img
            src="https://i.imgur.com/ShYtGlJ.png"
            alt="Logo Promesas a la Cancha"
            className="h-16 hover:scale-105 duration-300"
          />
        </Link>
        <ul className="hidden md:flex">
          <Link to="/about-players">
            <li className="p-4 hover:scale-105 duration-300">Jugadoras</li>
          </Link>
          <Link to="/about-scouts">
            <li className="p-4 hover:scale-105 duration-300">Reclutadores</li>
          </Link>
          <Link to="/about">
            <li className="p-4 hover:scale-105 duration-300">Nosotros</li>
          </Link>
          <Link to="/login">
            <li className="p-4 hover:scale-105 duration-300">Ingresa</li>
          </Link>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <Link to="/">
            <h1 className="w-full text-3xl font-bold text-black m-4">
              Promesas a la Cancha
            </h1>
          </Link>
          <Link to="/about-players">
            <li className="p-4 border-b border-gray-600">Jugadoras</li>
          </Link>
          <Link to="/about-scouts">
            <li className="p-4 border-b border-gray-600">Reclutadores</li>
          </Link>
          <Link to="/about">
            <li className="p-4 border-b border-gray-600">Nosotros</li>
          </Link>
          <Link to="/login">
            <li className="p-4 border-b border-gray-600">Ingresa</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
