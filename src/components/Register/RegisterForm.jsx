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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!acceptedTerms) {
      Toastify({
        text: "Debes aceptar los términos y condiciones",
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

  const renderInput = (label, icon, props) => (
    <div className="relative">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
        {icon}
        {label}
      </label>
      <input
        className={`appearance-none relative block w-full px-3 py-2 border ${
          errors[props.name] ? 'border-red-500' : 'border-gray-300'
        } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent`}
        {...props}
      />
      {errors[props.name] && (
        <p className="mt-1 text-sm text-red-600">{errors[props.name]}</p>
      )}
    </div>
  );

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
            {renderInput(
              'Correo Electrónico',
              <Mail className="h-4 w-4 text-lime-600" />,
              {
                type: 'email',
                name: 'email',
                required: true,
                placeholder: 'nombre@ejemplo.com',
                value: email,
                onChange: (e) => setEmail(e.target.value)
              }
            )}

            {renderInput(
              'Nombre Completo',
              <User className="h-4 w-4 text-lime-600" />,
              {
                type: 'text',
                name: 'name',
                required: true,
                placeholder: 'Tu nombre completo',
                value: name,
                onChange: (e) => setName(e.target.value)
              }
            )}

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <IdCard className="h-4 w-4 text-lime-600" />
                Tipo de Identificación
              </label>
              <select
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                value={typeid}
                onChange={(e) => setTypeId(e.target.value)}
              >
                <option value="">Selecciona tipo de ID</option>
                <option value="cc">Cédula de Ciudadanía</option>
                <option value="ce">Cédula de Extranjería</option>
                <option value="c">Contraseña Temporal</option>
                <option value="p">Pasaporte</option>
              </select>
            </div>

            {renderInput(
              'Número de Identificación',
              <Shield className="h-4 w-4 text-lime-600" />,
              {
                type: 'number',
                name: 'id',
                required: true,
                placeholder: 'Número de identificación',
                value: id,
                onChange: (e) => setId(e.target.value),
                min: "100000",
                max: "9999999999"
              }
            )}

            {renderInput(
              'Contraseña',
              <Key className="h-4 w-4 text-lime-600" />,
              {
                type: 'password',
                name: 'password',
                required: true,
                placeholder: '********',
                value: password,
                onChange: (e) => setPassword(e.target.value)
              }
            )}

            {renderInput(
              'Confirmar Contraseña',
              <Key className="h-4 w-4 text-lime-600" />,
              {
                type: 'password',
                name: 'repassword',
                required: true,
                placeholder: '********',
                value: repassword,
                onChange: (e) => setRepassword(e.target.value)
              }
            )}

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1 gap-2">
                <Users className="h-4 w-4 text-lime-600" />
                Rol
              </label>
              <select
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Selecciona tu rol</option>
                <option value="scout">Reclutador</option>
                <option value="player">Jugadora</option>
              </select>
            </div>
          </div>

          <div className="relative flex items-start mb-4">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                Acepto los{' '}
                <Link
                  to="/terms"
                  className="text-lime-600 hover:text-lime-700 underline"
                  target="_blank"
                >
                  términos y condiciones
                </Link>
              </label>
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
