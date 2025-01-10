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
    <div className="bg-white w-full fixed top-0 left-0 z-20 shadow-md">
      <div className="flex justify-center md:justify-between items-center h-16 max-w-[1740px] mx-auto px-4 text-black">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://i.imgur.com/ShYtGlJ.png"
            alt="Logo Promesas a la Cancha"
            className="h-12 hover:scale-105 duration-300"
          />
        </Link>

        {/* Navbar para pantallas grandes */}
        <ul className="hidden md:flex space-x-6">
          <NavLink to="/about-players" label="Jugadoras" />
          <NavLink to="/about-scouts" label="Reclutadores" />
          <NavLink to="/about" label="Nosotros" />
          <NavLink to="/login" label="Ingresa" />
        </ul>

        {/* Botón del menú móvil */}
        <div
          onClick={handleNavToggle}
          className="block md:hidden cursor-pointer text-2xl"
        >
          {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Menú lateral para dispositivos móviles */}
      <div
        className={`fixed top-0 left-0 w-[70%] h-full bg-white shadow-lg transform ${
          nav ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-black">Promesas a la Cancha</h1>
          <div
            onClick={handleNavToggle}
            className="text-black text-2xl cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>
        <ul className="mt-4 space-y-4">
          <NavLink to="/about-players" label="Jugadoras" onClick={handleNavToggle} />
          <NavLink to="/about-scouts" label="Reclutadores" onClick={handleNavToggle} />
          <NavLink to="/about" label="Nosotros" onClick={handleNavToggle} />
          <NavLink to="/login" label="Ingresa" onClick={handleNavToggle} />
        </ul>
      </div>

      {/* Fondo oscuro detrás del menú cuando está abierto */}
      {nav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleNavToggle}
        />
      )}
    </div>
  );
};

/**
 * Componente NavLink que representa un enlace de navegación.
 *
 * @param {string} to - La ruta a la que enlaza el componente.
 * @param {string} label - El texto que se muestra en el enlace.
 * @param {Function} onClick - Función opcional que se ejecuta al hacer clic en el enlace.
 * @returns {JSX.Element}
 */
const NavLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick}>
    <li className="p-4 text-black hover:bg-gray-100 rounded-lg transition">
      {label}
    </li>
  </Link>
);

export default NavbarLogin;
