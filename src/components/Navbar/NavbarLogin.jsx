import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

/**
 * Componente NavbarLogin que representa la barra de navegación para la página de inicio de sesión.
 * Incluye enlaces a diferentes secciones de la aplicación y un menú móvil.
 *
 * @component
 * @example
 * return (
 *   <NavbarLogin />
 * )
 */
const NavbarLogin = () => {
  const [nav, setNav] = useState(false);

  const handleNavToggle = () => {
    setNav((prevNav) => !prevNav);
  };

  return (
    <div className="bg-white w-full fixed top-0 left-0 z-20">
      <div className="flex justify-center md:justify-between items-center h-24 max-w-[1740px] mx-auto px-4 text-black">
        <Link to="/">
          <img
            src="https://i.imgur.com/ShYtGlJ.png"
            alt="Logo Promesas a la Cancha"
            className="h-16 hover:scale-105 duration-300"
          />
        </Link>
        <ul className="hidden md:flex">
          <NavLink to="/about-players" label="Jugadoras" />
          <NavLink to="/about-scouts" label="Reclutadores" />
          <NavLink to="/about" label="Nosotros" />
          <NavLink to="/login" label="Ingresa" />
        </ul>
        <div
          onClick={handleNavToggle}
          className="block md:hidden cursor-pointer"
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={`fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] transition-transform duration-500 ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="w-full text-3xl font-bold text-[#fff] m-4">
            Promesas a la Cancha
          </h1>
          <NavLink to="/about-players" label="Jugadoras" />
          <NavLink to="/about-scouts" label="Reclutadores" />
          <NavLink to="/about" label="Nosotros" />
          <NavLink to="/login" label="Ingresa" />
        </ul>
      </div>
    </div>
  );
};

/**
 * Componente NavLink que representa un enlace de navegación.
 *
 * @param {string} to - La ruta a la que enlaza el componente.
 * @param {string} label - El texto que se muestra en el enlace.
 * @returns {JSX.Element}
 */
const NavLink = ({ to, label }) => (
  <Link to={to}>
    <li className="p-4 hover:scale-105 duration-300">{label}</li>
  </Link>
);

export default NavbarLogin;
