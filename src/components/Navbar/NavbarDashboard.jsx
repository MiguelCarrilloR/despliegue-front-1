import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Componente NavbarPlayer que representa la barra de navegación para los jugadores.
 * Incluye notificaciones de mensajes y la opción de cerrar sesión.
 *
 * @component
 * @example
 * return (
 *   <NavbarPlayer />
 * )
 */
const NavbarDashboard = () => {
  const [nav, setNav] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const navigate = useNavigate();

  // Alternar estado de navegación
  const handleNavToggle = () => {
    setNav((prevNav) => !prevNav);
  };

  // Cerrar sesión y redirigir a la página principal
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Obtener conteo de mensajes no leídos
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const username = user.name;
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/message/unread-count/${username}`)
        .then((response) => {
          setMessageCount(response.data.count);
        })
        .catch((error) => {
          console.error("Error fetching message count:", error);
        });
    }
  }, []);

  // Manejar clic en notificaciones
  const handleNotificationsClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const username = user.name;
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/message/mark-as-read`, {
          to: username,
        });
        setMessageCount(0); // Restablecer contador de mensajes no leídos
        navigate(`/playerChat/${username}`); // Redirigir a la página de mensajes
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    }
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
        <ul className="hidden md:flex items-center">
          <li
            className="p-4 hover:scale-105 duration-300 relative cursor-pointer"
            onClick={handleNotificationsClick}
          >
            <IoIosNotifications size={24} />
            {messageCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {messageCount}
              </span>
            )}
          </li>
          <Link to="/" onClick={logout}>
            <li className="p-4 hover:scale-105 duration-300">Cerrar Sesión</li>
          </Link>
        </ul>
        <div
          onClick={handleNavToggle}
          className="block md:hidden cursor-pointer"
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={`fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white transition-transform duration-500 ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
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

export default NavbarDashboard;
