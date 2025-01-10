import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavbarLogin from "../components/Navbar/NavbarLogin";
import Footer from "../components/Footer/Footer";

/**
 * Hook personalizado para obtener los parámetros de la URL.
 *
 * @returns {URLSearchParams} - Parámetros de búsqueda de la URL.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Componente para restablecer la contraseña del usuario.
 * Permite al usuario ingresar una nueva contraseña y confirmarla.
 *
 * @component
 * @returns {JSX.Element} - Renderiza el formulario de restablecimiento de contraseña.
 */
function ResetPasswordPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Maneja el envío del formulario de restablecimiento de contraseña.
   * Valida que las contraseñas coincidan y envía la nueva contraseña a la API.
   *
   * @param {React.FormEvent} e - Evento de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    const token = query.get("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/reset-password`,
        {
          token,
          newPassword,
        }
      );

      if (response.status === 200) {
        setMessage("Contraseña actualizada correctamente");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirigir a la página de inicio de sesión después de 2 segundos
      }
    } catch (error) {
      setMessage("Error al actualizar la contraseña");
      console.error("Error al actualizar la contraseña:", error);
    }
  };

  return (
    <>
      <NavbarLogin />
      <div className="w-full h-screen py-16 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: "url('https://i.imgur.com/c5tHJ8t.jpg')" }}></div>
        <div className="flex justify-center items-center w-full h-full relative z-10">
          <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
            <form className="form grid" onSubmit={handleSubmit}>
              <div className="sm:flex-row items-center justify-between w-full my-8">
                <label className="text-black">Nueva Contraseña</label>
                <input
                  className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="text-black">
                  Confirma tu Nueva Contraseña
                </label>
                <input
                  className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {message && <p className="text-red-500">{message}</p>}
                <button className="bg-lime-500 text-black w-full rounded-md font-medium my-6 px-6 py-3 hover:scale-105 duration-300">
                  Restablecer Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default ResetPasswordPage;
