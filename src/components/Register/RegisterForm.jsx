import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Componente que representa el formulario de registro de usuarios.
 * Permite a los nuevos usuarios registrarse proporcionando su información personal y de contacto.
 *
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
  const [loading, setLoading] = useState(false); // Indicador de carga

  /**
   * Maneja el evento de envío del formulario.
   * Valida los datos ingresados y realiza una solicitud POST para registrar al usuario.
   *
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (
      !email ||
      !name ||
      !password ||
      !repassword ||
      !role ||
      !id ||
      !typeid
    ) {
      Toastify({
        text: "Por favor completa todos los campos",
        duration: 3000,
        close: true,
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
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
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    if (password !== repassword) {
      Toastify({
        text: "Las contraseñas no coinciden",
        duration: 3000,
        close: true,
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    setLoading(true); // Muestra el indicador de carga

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signup`,
        {
          email: email,
          name: name,
          password: password,
          role: role,
          typeid: typeid,
          identification: id,
          domain: window.location.origin,
        }
      );

      if (response.status === 200) {
        Toastify({
          text: "Registrado correctamente. Revisa tu correo para verificar la cuenta.",
          duration: 3000,
          close: true,
          gravity: "top", // "top" o "bottom"
          position: "center", // "left", "center" o "right"
          backgroundColor: "#84cc16",
        }).showToast();

        setLoading(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setLoading(false); // Oculta el indicador de carga en caso de error
      if (error.response && error.response.status === 400) {
        Toastify({
          text: error.response.data.message,
          duration: 3000,
          close: true,
          gravity: "top", // "top" o "bottom"
          position: "center", // "left", "center" o "right"
          backgroundColor: "#A52A2A",
        }).showToast();
      } else {
        console.log("Error", error);
        Toastify({
          text: "Error al registrar el usuario.",
          duration: 3000,
          close: true,
          gravity: "top", // "top" o "bottom"
          position: "center", // "left", "center" o "right"
          backgroundColor: "#A52A2A",
        }).showToast();
      }
    }
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
          <form className="form grid" onSubmit={handleSubmit}>
            <div className="sm:flex-row items-center justify-between w-full my-8">
              <label className="text-black">Email</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="text"
                placeholder="Ingresa tu correo"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="text-black">Nombre Completo</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="text"
                placeholder="Ingresa tu nombre y apellido"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label className="text-black my-8">Tipo de Identificación</label>
              <select
                id="typeid"
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                required
                onChange={(e) => setTypeId(e.target.value)}
              >
                <option value="">Selecciona tu tipo de Identificación</option>
                <option value="cc">Cédula de Ciudadanía</option>
                <option value="ti">Tarjeta de Identidad</option>
                <option value="ce">Cédula de Extranjería</option>
                <option value="c">Contraseña</option>
                <option value="p">Pasaporte</option>
              </select>
              <label className="text-black">Número de Identificación</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="number"
                placeholder="Ingresa tu Número de Identificación"
                id="id"
                required
                onChange={(e) => setId(e.target.value)}
              />
              <label className="text-black my-8">Contraseña</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="password"
                placeholder="Ingresa tu contraseña"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="text-black my-8">Valida tu Contraseña</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                type="password"
                placeholder="Repite tu contraseña"
                id="repassword"
                required
                onChange={(e) => setRepassword(e.target.value)}
              />
              <label className="text-black my-8">Selecciona un rol</label>
              <select
                id="role"
                className="p-3 flex w-full rounded-md text-black border border-lime-500 mb-4"
                required
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Selecciona tu rol</option>
                <option value="scout">Reclutador</option>
                <option value="player">Jugadora</option>
              </select>
              <button
                className="bg-lime-500 text-black w-full rounded-md font-medium my-6 px-6 py-3 hover:scale-105 duration-300"
                disabled={loading} // Deshabilita el botón mientras se envía la petición
              >
                {loading ? "Enviando..." : "Registrar"}{" "}
                {/* Muestra "Enviando..." durante la petición */}
              </button>
              <p className="text-black my-2">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-lime-500 hover:scale-105 duration-300"
                >
                  Ingresa aqui
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
