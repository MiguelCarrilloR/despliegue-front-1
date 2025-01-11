import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { UserPlus, Mail, User, Key, Shield, IdCard, Users } from 'lucide-react';

/**
 * Componente que representa el formulario de registro de usuarios.
 * @component
 * @returns {JSX.Element} - Renderiza el formulario de registro.
 */
function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [typeid, setTypeId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !password || !repassword || !role || !id || !typeid) {
      Toastify({
        text: "Por favor completa todos los campos",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    const validDomains = [
      "gmail.com",
      "yopmail.com",
      "hotmail.com",
      "outlook.com",
      "unbosque.edu.co",
      "unimilitar.edu.co",
    ];
    const emailDomain = email.split("@")[1];

    if (!validDomains.includes(emailDomain)) {
      Toastify({
        text: "Por favor usa un correo electrónico válido",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    if (password !== repassword) {
      Toastify({
        text: "Las contraseñas no coinciden",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
        {
          email,
          name,
          password,
          role,
          typeid,
          identification: id,
          domain: window.location.origin,
        }
      );

      if (response.status === 200) {
        Toastify({
          text: "Registrado correctamente. Revisa tu correo para verificar la cuenta.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "#84cc16",
        }).showToast();

        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      Toastify({
        text: error.response?.data?.message || "Error al registrar el usuario.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#A52A2A",
      }).showToast();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-lime-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl">
        <div className="text-center">
          <img
            src="https://i.imgur.com/anUuFBV.png"
            alt="Logo Promesas"
            className="mx-auto h-32 w-auto rounded-lg shadow-md"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
            <UserPlus className="h-8 w-8 text-lime-600" />
            Registrarse
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <Mail className="h-4 w-4 text-lime-600" />
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="nombre@ejemplo.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <User className="h-4 w-4 text-lime-600" />
                Nombre Completo
              </label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Tu nombre completo"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <IdCard className="h-4 w-4 text-lime-600" />
                Tipo de Identificación
              </label>
              <select
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                onChange={(e) => setTypeId(e.target.value)}
              >
                <option value="">Selecciona tipo de ID</option>
                <option value="cc">Cédula de Ciudadanía</option>
                <option value="ti">Tarjeta de Identidad</option>
                <option value="ce">Cédula de Extranjería</option>
                <option value="c">Contraseña</option>
                <option value="p">Pasaporte</option>
              </select>
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <Shield className="h-4 w-4 text-lime-600" />
                Número de Identificación
              </label>
              <input
                type="number"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="Número de identificación"
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <Key className="h-4 w-4 text-lime-600" />
                Contraseña
              </label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <Key className="h-4 w-4 text-lime-600" />
                Confirmar Contraseña
              </label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                placeholder="********"
                onChange={(e) => setRepassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <Users className="h-4 w-4 text-lime-600" />
                Rol
              </label>
              <select
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Selecciona tu rol</option>
                <option value="scout">Reclutador</option>
                <option value="player">Jugadora</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? (
                "Procesando..."
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Crear cuenta
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-700">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-medium text-lime-600 hover:text-lime-700 transition-colors duration-200">
              Ingresa aquí
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
}

export default RegisterForm;
