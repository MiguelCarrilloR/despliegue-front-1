import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { User, Lock, LogIn, ArrowRight } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const roleUser = user.role;
      const validateScout = user.organization;
      const validatePlayer = user.height;
      if (roleUser === "scout") {
        if (validateScout === undefined) {
          navigate("/scout");
        } else {
          navigate("/scout-dashboard");
        }
      }
      if (roleUser === "player") {
        if (validatePlayer === undefined) {
          navigate("/player");
        } else {
          navigate("/player-dashboard");
        }
      }
      if (roleUser === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate]);

  const sentUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/signin`, {
        email,
        password,
      });

      if (response.data.message) {
        Toastify({
          text: response.data.message,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "#A52A2A",
        }).showToast();
      } else {
        const roleUser = response.data.role;
        const validateScout = response.data.organization;
        const validatePlayer = response.data.height;
        
        localStorage.setItem("user", JSON.stringify(response.data));

        if (roleUser === "scout") {
          navigate(validateScout === undefined ? "/scout" : "/scout-dashboard");
        } else if (roleUser === "player") {
          navigate(validatePlayer === undefined ? "/player" : "/player-dashboard");
        } else if (roleUser === "admin") {
          navigate("/admin");
        }
      }
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Error en la solicitud.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#A52A2A",
      }).showToast();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="w-full h-full object-cover opacity-40 scale-105 transform transition duration-1000 hover:scale-110"
          src="https://i.imgur.com/c5tHJ8t.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10 my-6 mb-7">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          {/* Left side - Welcome message */}
          <div className="text-white space-y-6 max-w-xl lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Bienvenido a Promesas a la Cancha
            </h1>
            <p className="text-gray-300 text-lg">
              Tu plataforma para conectar el talento con las oportunidades en el fútbol femenino.
            </p>
            <div className="flex gap-4 items-center">
              <div className="h-1 w-20 bg-lime-500 rounded-full" />
              <span className="text-gray-400">Inicia sesión para continuar</span>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-md">
            <div className="bg-white/95 p-8 rounded-2xl shadow-2xl backdrop-blur-xl transform transition-all duration-300 hover:shadow-lime-500/20">
              <div className="mb-8 text-center">
                <img
                  src="https://i.imgur.com/anUuFBV.png"
                  alt="Logo Promesas"
                  className="mx-auto h-24 transform transition-all duration-300 hover:scale-105"
                />
              </div>

              <form className="space-y-6" onSubmit={sentUser}>
                <div className="space-y-4">
                  <div className="relative group">
                    <label className="block text-gray-700 font-medium mb-2 transition-all duration-200 group-focus-within:text-lime-600">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-lime-600" />
                      <input
                        className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all duration-300 outline-none"
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-gray-700 font-medium mb-2 transition-all duration-200 group-focus-within:text-lime-600">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-lime-600" />
                      <input
                        className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all duration-300 outline-none"
                        type="password"
                        placeholder="••••••••"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full bg-lime-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-lime-600 transform transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-lime-500/50 flex items-center justify-center gap-2 disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Iniciando sesión..."
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Iniciar Sesión
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 space-y-4">
                <Link
                  to="/recover"
                  className="block text-center text-gray-600 hover:text-lime-600 transition-colors duration-300 text-sm"
                >
                  ¿Olvidaste tu contraseña?
                </Link>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">o</span>
                  </div>
                </div>

                <Link
                  to="/register"
                  className="block text-center p-3 rounded-lg border-2 border-lime-500 text-lime-600 font-medium hover:bg-lime-50 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Crear una cuenta nueva
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;