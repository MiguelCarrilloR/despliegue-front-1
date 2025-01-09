import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../Navbar/NavbarAdmin";

/**
 * @function MessageList
 * @description Componente que muestra una lista de mensajes y permite a los administradores
 * eliminar mensajes. Verifica el rol del usuario y redirige si no es administrador.
 * @returns {JSX.Element} Componente que renderiza la lista de mensajes.
 */
function MessageList() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userRole = JSON.parse(user).role;
      if (userRole !== "admin") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
    fetchMessages();
  }, [navigate]);

  /**
   * @function fetchMessages
   * @description Obtiene los mensajes del backend y los ordena por fecha de
   * manera descendente.
   */
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/message`
      );
      const sortedMessages = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Hubo un error obteniendo los mensajes:", error);
    }
  };

  /**
   * @function handleDelete
   * @description Elimina un mensaje específico y actualiza el estado para reflejar
   * la eliminación.
   * @param {string} messageId - ID del mensaje a eliminar.
   */
  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/message/${messageId}`);
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId)
      );
    } catch (error) {
      console.error("Hubo un error eliminando el mensaje:", error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="my-20 px-4">
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
          Lista de Mensajes
        </h1>
        <div className="mt-10 mx-auto max-w-4xl">
          {messages.length > 0 ? (
            <ul className="space-y-4">
              {messages.map((message) => (
                <li
                  key={message._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">De: {message.from}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p>Para: {message.to}</p>
                    <p className="mt-2">{message.content}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No hay mensajes disponibles.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MessageList;
