import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Componente LoginForm que maneja el inicio de sesión de usuarios.
 * Permite a los usuarios ingresar su correo electrónico y contraseña
 * y redirige según su rol después de iniciar sesión.
 *
 * @component
 * @example
 * return (
 *   <LoginForm />
 * )
 */
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
            text: response.data.message, // Muestra el mensaje de error desde el backend
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
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
        // Manejo de errores
        if (error.response) {
          // La solicitud se hizo y el servidor respondió con un código de estado que no está en el rango de 2xx
          Toastify({
            text:
              "Error: " + error.response.data.message ||
              "Error en la solicitud.",
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
            backgroundColor: "#A52A2A",
          }).showToast();
        } else if (error.request) {
          // La solicitud se hizo pero no se recibió respuesta
          Toastify({
            text: "Error: No se recibió respuesta del servidor.",
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
            backgroundColor: "#A52A2A",
          }).showToast();
        } else {
          // Algo ocurrió al configurar la solicitud
          Toastify({
            text: "Error: " + error.message,
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
            backgroundColor: "#A52A2A",
          }).showToast();
        }
      });
  };

  return (
    <div className="w-full py-16 text-white px-4">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 my-4">
          <div className="flex justify-center items-center">
            <img
              className="w-full h-auto rounded-lg"
              src={"https://i.imgur.com/DYlbbCU.jpg"}
              alt="Banner"
            />
          </div>
        </div>
        <div className="my-4 lg:ml-8">
          <img
            src="https://i.imgur.com/anUuFBV.png"
            alt="Logo Promesas"
            className="mb-8"
          />
          <form action="" className="form grid" onSubmit={sentUser}>
            <div className="sm:flex-row items-center justify-between w-full my-8">
              <label className="text-black">Email</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="email"
                placeholder="Ingresa tu correo"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="text-black my-8">Contraseña</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="password"
                placeholder="Ingresa tu contraseña"
                id="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="text-black my-2">
                ¿Has Olvidado tu Contraseña?{" "}
                <Link
                  to="/recover"
                  className="text-lime-500 hover:scale-105 duration-300"
                >
                  Ingresa aquí
                </Link>
              </p>
              <button className="bg-lime-500 text-black w-full rounded-md font-medium my-6 px-6 py-3 hover:scale-105 duration-300">
                Entrar
              </button>
              <p className="text-black my-2">
                ¿Aún no tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-lime-500 hover:scale-105 duration-300"
                >
                  Ingresa aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
