import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      {/* Contenedor principal */}
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        {/* Botón para abrir el menú lateral */}
        <div onClick={handleNav} className="text-2xl cursor-pointer md:hidden">
          <AiOutlineMenu />
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <img
            src="https://i.imgur.com/ShYtGlJ.png"
            alt="Logo Promesas a la Cancha"
            className="h-12"
          />
        </Link>

        {/* Opciones del navbar en escritorio */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              to="/about-players"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Jugadoras
            </Link>
          </li>
          <li>
            <Link
              to="/about-scouts"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Reclutadores
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-gray-800 hover:text-blue-600 transition"
            >
              Ingresa
            </Link>
          </li>
        </ul>
      </div>

      {/* Menú lateral para dispositivos móviles */}
      <div
        className={`fixed top-0 left-0 w-[75%] h-full bg-white text-white transform ${
          nav ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-black">Promesas a la Cancha</h1>
          <div
            onClick={handleNav}
            className="text-black text-2xl cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>
        <ul className="mt-8 space-y-4">
          <li className="p-4">
            <Link
              to="/about-players"
              className="block text-black rounded-md p-2"
              onClick={handleNav}
            >
              Jugadoras
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/about-scouts"
              className="block text-black rounded-md p-2"
              onClick={handleNav}
            >
              Reclutadores
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/about"
              className="block text-black rounded-md p-2"
              onClick={handleNav}
            >
              Nosotros
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/login"
              className="block text-black rounded-md p-2"
              onClick={handleNav}
            >
              Ingresa
            </Link>
          </li>
        </ul>
      </div>

      {/* Fondo oscuro detrás del menú cuando está abierto */}
      {nav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleNav}
        />
      )}
    </div>
  );
};

export default Navbar;
