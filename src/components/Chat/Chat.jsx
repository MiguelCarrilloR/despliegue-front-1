import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";

const socket = io(`${import.meta.env.VITE_API_URL}`);

/**
 * @function Chat
 * @description Componente de chat que permite la comunicación en tiempo real
 * entre usuarios. Muestra una lista de contactos, mensajes y permite enviar
 * nuevos mensajes.
 * @returns {JSX.Element} Componente de chat.
 */
function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [to, setTo] = useState("");
  const [users, setUsers] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
      if (parsedUser.role !== "player" && parsedUser.role !== "scout") {
        return navigate("/unauthorized");
      }
    } else {
      return navigate("/unauthorized");
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/message/contacts/${username}`
        );
        const uniqueUsers = Array.from(
          new Set(response.data.map((user) => user.email))
        ).map((email) => {
          return response.data.find((user) => user.email === email);
        });
        setUsers(uniqueUsers);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    socket.on("receiveMessage", (message) => {
      if (
        (message.from === username && message.to === to) ||
        (message.from === to && message.to === username)
      ) {
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) =>
              msg.from === message.from &&
              msg.to === message.to &&
              msg.content === message.content &&
              new Date(msg.timestamp).getTime() ===
                new Date(message.timestamp).getTime()
          );
          if (!messageExists) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      }
    });

    if (username && to) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/message/messages/${username}/${to}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, [to, username, navigate]);

  /**
   * @function handleSendMessage
   * @description Envía un nuevo mensaje a través del socket y actualiza el estado
   * del componente.
   */
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = {
      from: username,
      to,
      content: newMessage,
      timestamp: new Date(),
    };
    socket.emit("sendMessage", message);
    setNewMessage("");
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(
        (msg) =>
          msg.from === message.from &&
          msg.to === message.to &&
          msg.content === message.content &&
          new Date(msg.timestamp).getTime() ===
            new Date(message.timestamp).getTime()
      );
      if (!messageExists) {
        return [...prevMessages, message];
      }
      return prevMessages;
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <input
            type="text"
            placeholder="Buscar usuario"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {users.length === 0 ? (
            <p className="text-gray-500">
              {userRole === "scout"
                ? "Contacta jugadoras para empezar un chat."
                : "Aún no te ha contactado ningún reclutador, sigue mejorando tu perfil para obtener mejores oportunidades."}
            </p>
          ) : (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.email}
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    user.name === to ? "bg-lime-100" : ""
                  }`}
                  onClick={() => setTo(user.name)}
                >
                  <img
                    src={`${user.photo}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-bold">{user.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-8">
          <img
            src="https://i.imgur.com/anUuFBV.png"
            alt="Logo Promesas"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-4 border-b border-gray-200">
          <img
            src={`https://ui-avatars.com/api/?name=${to}`}
            alt={to}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-bold">{to}</p>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.from === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  message.from === username ? "bg-lime-100" : "bg-gray-200"
                } max-w-xs`}
              >
                <p>{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Escribe aquí"
              className="flex-1 p-2 border border-gray-300 rounded"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />

            <button
              onClick={handleSendMessage}
              className="p-2 bg-lime-500 text-white rounded"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="absolute bottom-4 left-4 bg-lime-500 text-[#000] rounded-md font-medium py-3 px-6 flex items-center hover:scale-105 duration-300 my-2"
      >
        <IoIosArrowRoundBack className="mr-2" /> Volver
      </button>
    </div>
  );
}

export default Chat;
