import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarLogin from "../components/Navbar/NavbarLogin";
import Footer from "../components/Footer/Footer";

/**
 * Componente para recuperar la contraseña del usuario.
 * Permite al usuario ingresar su correo electrónico y solicitar la recuperación de su contraseña.
 *
 * @component
 * @returns {JSX.Element} - Renderiza el formulario de recuperación de contraseña.
 */
function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Maneja el envío del formulario.
   * Envía una solicitud a la API para recuperar la contraseña utilizando el correo electrónico proporcionado.
   *
   * @param {React.FormEvent} e - Evento de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentDomain = window.location.origin; // Obtener el dominio actual
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/recover-password`,
        {
          email,
          domain: currentDomain, // Incluir el dominio en el cuerpo de la solicitud
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          "Error al enviar la solicitud de recuperación de contraseña."
        );
      }
    }
  };

  return (
    <>
      <NavbarLogin />
      <div className="w-full py-16 text-black px-4">
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
            <form action="" className="form grid" onSubmit={handleSubmit}>
              <div className="sm:flex-row items-center justify-between w-full my-8">
                <h1 className="md:text-2xl sm:text-5xl text-4xl font-bold py-2 text-center my-10">
                  Recupera tu contraseña
                </h1>
                <label className="text-black">Email</label>
                <input
                  className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                  type="email"
                  placeholder="Ingresa tu correo"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-lime-500 text-black w-full rounded-md font-medium my-6 px-6 py-3 hover:scale-105 duration-300">
                  Recuperar Contraseña
                </button>
                <p className="text-black my-2">
                  ¿Deseas volver a la Página anterior?{" "}
                  <Link
                    to="/login"
                    className="text-lime-500 hover:scale-105 duration-300"
                  >
                    Ingresa aqui
                  </Link>
                </p>
                {message && <p className="text-black my-2">{message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecoverPasswordPage;
