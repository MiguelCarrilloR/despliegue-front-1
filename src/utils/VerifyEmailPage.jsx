import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";


/**
 * Componente que verifica la dirección de correo electrónico del usuario.
 * Extrae el token de la URL y realiza una solicitud a la API para verificar el correo.
 *
 * @component
 * @returns {JSX.Element} - Renderiza la interfaz de verificación de correo electrónico.
 */
function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener los parámetros de la URL

  // Extraer el token de la URL
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          throw new Error("Token no proporcionado.");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/verify-email?token=${token}`
        );

        if (response.status === 200) {
          setMessage(
            "Correo verificado correctamente. Serás redirigido a la página de inicio de sesión."
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          throw new Error("Error al verificar el correo.");
        }
      } catch (error) {
        // Mensajes personalizados dependiendo del caso
        if (error.message === "Token no proporcionado.") {
          setMessage("No se proporcionó un token válido en el enlace.");
        } else {
          setMessage(
            "Error al verificar el correo. El enlace podría haber expirado o el token es inválido."
          );
        }
      } finally {
        setLoading(false); // Asegura que se deshabilite el estado de carga
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-lg max-w-[600px] w-full text-center text-black">
          {loading ? (
            <p>Verificando tu correo, por favor espera...</p>
          ) : (
            <p>{message}</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default VerifyEmailPage;
