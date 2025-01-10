import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
    <div className="w-full h-screen relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://i.imgur.com/c5tHJ8t.jpg"
          alt="Background"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
          <img
            src="https://i.imgur.com/anUuFBV.png"
            alt="Logo Promesas"
            className="mb-8 mx-auto"
          />
          <form className="grid gap-4" onSubmit={sentUser}>
            <div>
              <label className="block text-black mb-2">Email</label>
              <input
                className="p-3 w-full rounded-md text-black border border-lime-500"
                type="email"
                placeholder="Ingresa tu correo"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-black mb-2">Contraseña</label>
              <input
                className="p-3 w-full rounded-md text-black border border-lime-500"
                type="password"
                placeholder="Ingresa tu contraseña"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="bg-lime-500 text-black w-full rounded-md font-medium py-3 hover:scale-105 transition duration-300">
              Entrar
            </button>
          </form>
          <p className="text-black mt-4 text-center">
            ¿Has Olvidado tu Contraseña?{" "}
            <Link
              to="/recover"
              className="text-lime-500 hover:scale-105 transition duration-300"
            >
              Ingresa aquí
            </Link>
          </p>
          <p className="text-black mt-2 text-center">
            ¿Aún no tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-lime-500 hover:scale-105 transition duration-300"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
