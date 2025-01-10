import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(https://i.imgur.com/j3KNPyS.jpg)' }}>
  <div className="max-w-md w-full space-y-8 p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
    <div className="text-center">
      <img
        src="https://i.imgur.com/anUuFBV.png"
        alt="Logo Promesas"
        className="w-full h-full object-cover"
      />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Registrarse
      </h2>
    </div>
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          placeholder="Ingresa tu correo"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre Completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          placeholder="Ingresa tu nombre"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="typeid" className="block text-sm font-medium text-gray-700">
          Tipo de Identificación
        </label>
        <select
          id="typeid"
          name="typeid"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="">Selecciona tu tipo de Identificación</option>
          <option value="cc">Cédula de Ciudadanía</option>
          <option value="ti">Tarjeta de Identidad</option>
          <option value="ce">Cédula de Extranjería</option>
          <option value="c">Contraseña</option>
          <option value="p">Pasaporte</option>
        </select>
      </div>

      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          Número de Identificación
        </label>
        <input
          id="id"
          name="id"
          type="number"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          placeholder="Ingresa tu Número de Identificación"
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          placeholder="Ingresa tu contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="repassword" className="block text-sm font-medium text-gray-700">
          Confirmar Contraseña
        </label>
        <input
          id="repassword"
          name="repassword"
          type="password"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          placeholder="Repite tu contraseña"
          onChange={(e) => setRepassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Rol
        </label>
        <select
          id="role"
          name="role"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Selecciona tu rol</option>
          <option value="scout">Reclutador</option>
          <option value="player">Jugadora</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Registrar"}
        </button>
      </div>
    </form>

    <div className="text-sm text-center mt-4">
      <p className="text-gray-700">
        ¿Ya tienes una cuenta? 
        <Link to="/login" className="font-medium text-lime-600 hover:text-lime-500">
          Ingresa aquí
        </Link>
      </p>
    </div>
  </div>
</div>

  );
}

export default RegisterForm;
