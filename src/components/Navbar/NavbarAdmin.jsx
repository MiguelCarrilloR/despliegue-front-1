import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

/**
 * @function NavbarAdmin
 * @description Componente de navegación para administradores que permite la
 * navegación entre diferentes secciones de la aplicación y gestionar la sesión
 * del usuario.
 * @returns {JSX.Element} Componente de barra de navegación para administradores.
 */
const NavbarAdmin = () => {
  const [nav, setNav] = useState(false);

  // Redireccionamiento
  const navigate = useNavigate();

  /**
   * @function handleNav
   * @description Cambia el estado de la barra de navegación, abriéndola o
   * cerrándola según su estado actual.
   */
  const handleNav = () => {
    setNav(!nav);
  };

  /**
   * @function logout
   * @description Elimina la información del usuario del almacenamiento local y
   * redirige al usuario a la página de inicio.
   */
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-white w-full fixed top-0 left-0 z-20 mr-20">
      <div className="flex justify-center md:justify-between items-center h-24 max-w-[1740px] mx-auto px-4 text-black">
        <Link to="/">
          <img
            src="https://i.imgur.com/ShYtGlJ.png"
            alt="Logo Promesas a la Cancha"
            className="h-16 hover:scale-105 duration-300"
          />
        </Link>
        <ul className="hidden md:flex">
          <Link to="/admin">
            <li className="p-4 hover:scale-105 duration-300">
              Lista de Usuarios
            </li>
          </Link>
          <Link to="/admin-messages">
            <li className="p-4 hover:scale-105 duration-300">
              Gestión de mensajes
            </li>
          </Link>
          <Link to="/" onClick={logout}>
            <li className="p-4 hover:scale-105 duration-300">Cerrar Sesión</li>
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
          <Link to="/" onClick={logout}>
            <li className="p-4 border-b border-gray-600">Cerrar Sesión</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;
