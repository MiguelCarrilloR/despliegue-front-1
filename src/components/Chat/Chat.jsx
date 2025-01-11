import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Search, Send, ArrowLeft, Menu } from 'lucide-react';

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
  const [showSidebar, setShowSidebar] = React.useState(false);

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
            `${import.meta.env.VITE_API_URL
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
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform transition-transform duration-300 fixed md:relative w-80 h-full bg-white shadow-lg z-40 md:m-2 rounded-xl overflow-hidden flex flex-col`}>
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar usuario"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          
          {users.length === 0 ? (
            <div className="text-gray-500 p-4 text-center bg-gray-50 rounded-lg">
              <p className="text-sm">
                {userRole === "scout"
                  ? "Contacta jugadoras para empezar un chat"
                  : "Aún no te ha contactado ningún reclutador. Sigue mejorando tu perfil para obtener mejores oportunidades."}
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.email}
                  onClick={() => {
                    setTo(user.name);
                    setShowSidebar(false);
                  }}
                  className={`flex items-center p-3 rounded-lg transition-all hover:bg-gray-50 cursor-pointer ${
                    user.name === to ? "bg-lime-50 border-l-4 border-lime-500" : ""
                  }`}
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="mt-auto p-4 border-t">
          <img
            src="https://i.imgur.com/anUuFBV.png"
            alt="Logo Promesas"
            className="w-32 mx-auto opacity-75 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white md:m-2 md:ml-0 rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center px-6 py-3 border-b border-gray-200 bg-white">
          <img
            src={`https://ui-avatars.com/api/?name=${to}`}
            alt={to}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div className="ml-3">
            <p className="font-semibold text-gray-800">{to}</p>
            <p className="text-xs text-gray-500">Activo ahora</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.from === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow-sm max-w-[85%] md:max-w-md ${
                  message.from === username 
                    ? "bg-lime-500 text-white" 
                    : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.from === username 
                    ? "text-lime-100" 
                    : "text-gray-500"
                }`}>
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
              className="p-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-4 left-4 bg-lime-500 text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-lime-600 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 z-50"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden md:inline">Volver</span>
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}

export default Chat;
