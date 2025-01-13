import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlarmClock, Home, ShieldOff } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-lime-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"></div>
        
        {/* Logo */}
        <img
          src="https://i.imgur.com/anUuFBV.png"
          alt="Logo Promesas"
          className="mx-auto h-32 w-auto rounded-lg shadow-md mb-8"
        />

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <ShieldOff className="h-16 w-16 text-red-500" />
          </div>
        </div>

        {/* Main content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Estás en fuera de juego!
        </h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-600">
            No tienes autorización para acceder a esta página.
          </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-600">
            <AlarmClock className="h-5 w-5" />
            <p className="text-sm">Tu sesión ha expirado o has sido desconectado</p>
          </div>
        </div>

        {/* Action button */}
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
        >
          <Home className="h-5 w-5 mr-2" />
          Volver al inicio
        </Link>

        {/* Decorative football field lines */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-lime-100">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-1/4 w-px h-full bg-white"></div>
            <div className="absolute top-0 left-2/4 w-px h-full bg-white"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;