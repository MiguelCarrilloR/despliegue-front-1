import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { User, Lock } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const sentUser = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/signin`, {
        email: email,
        password: password,
      })
      .then((response) => {
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
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        Toastify({
          text:
            error.response?.data?.message || "Error en la solicitud.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "#A52A2A",
        }).showToast();
      });
  };

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-60 backdrop-blur-sm"
          src="https://i.imgur.com/c5tHJ8t.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <div className="absolute inset-0 flex justify-center items-center px-4">
        <div className="bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-lime-500/20">
          <div className="mb-8 text-center">
            <img
              src="https://i.imgur.com/anUuFBV.png"
              alt="Logo Promesas"
              className="mx-auto transform transition-all duration-300 hover:scale-105"
            />
          </div>

          <form className="space-y-6" onSubmit={sentUser}>
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all duration-300 outline-none"
                  type="email"
                  placeholder="Ingresa tu correo"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 transition-all duration-300 outline-none"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full bg-lime-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-lime-600 transform transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-lime-500/50">
              Entrar
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <p className="text-gray-600 text-center text-sm">
              ¿Has olvidado tu contraseña?{" "}
              <Link
                to="/recover"
                className="text-lime-600 font-medium hover:text-lime-700 transition-colors duration-300"
              >
                Ingresa aquí
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">o</span>
              </div>
            </div>

            <p className="text-gray-600 text-center text-sm">
              ¿Aún no tienes cuenta?{" "}
              <Link
                to="/register"
                className="text-lime-600 font-medium hover:text-lime-700 transition-colors duration-300"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
