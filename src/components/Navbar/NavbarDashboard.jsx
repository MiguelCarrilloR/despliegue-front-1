import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import axios from "axios";

const NavbarDashboard = () => {
  const [nav, setNav] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNotificationsClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const username = user.name;
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/message/mark-as-read`, {
          to: username,
        });
        setMessageCount(0);
        navigate(`/playerChat/${username}`);
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://i.imgur.com/ShYtGlJ.png"
              alt="Logo Promesas a la Cancha"
              className="h-14 w-auto transform hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleNotificationsClick}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                  {messageCount}
                </span>
              )}
            </button>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setNav(!nav)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {nav ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        nav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            nav ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setNav(false)}
        />
        
        {/* Mobile menu */}
        <div className={`absolute top-0 right-0 w-64 h-full bg-white transform transition-transform duration-300 ${
          nav ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Menú</h2>
              <button
                onClick={() => setNav(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => {
                  handleNotificationsClick();
                  setNav(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Notificaciones</span>
                </div>
                {messageCount > 0 && (
                  <span className="h-6 w-6 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                    {messageCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => {
                  logout();
                  setNav(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Cerrar Sesión</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;