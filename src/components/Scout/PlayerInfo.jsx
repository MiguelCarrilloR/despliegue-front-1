import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";
import { io } from "socket.io-client";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import NavbarDashboard from "../Navbar/NavbarDashboard";
import Footer from "../Footer/Footer";

const socket = io(`${import.meta.env.VITE_API_URL}`);

const PlayerInfo = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const defaultMessage = "Hola, ¡Estoy buscando tu talento!";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userRole = JSON.parse(user).role;
      if (userRole !== "scout") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }

    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/playerId/${id}`
        );
        setPlayer(response.data);
      } catch (error) {
        console.error("Error al obtener la información de la jugadora:", error);
        Toastify({
          text: "Error al cargar la información de la jugadora. Inténtalo de nuevo más tarde.",
          duration: 3000,
          close: true,
          gravity: "top", // "top" o "bottom"
          position: "center", // "left", "center" o "right"
          backgroundColor: "#A52A2A",
        }).showToast();
      }
    };

    fetchPlayer();
  }, [id, navigate]);

  if (!player) {
    return <div>Cargando...</div>;
  }

  /**
   * Maneja el envío de un mensaje al jugador.
   */
  const handleMessage = () => {
    const message = {
      from: JSON.parse(localStorage.getItem("user")).name,
      to: player.name,
      content: defaultMessage,
      timestamp: new Date(),
    };
    socket.emit("sendMessage", message);
    console.log(messages);

    setMessages((prevMessages) => [...prevMessages, message]);
    Toastify({
      text: "Un mensaje nuevo ha sido enviado, revisa el chat para seguir la conversación con la jugadora",
      duration: 3000,
      close: true,
      gravity: "top", // "top" o "bottom"
      position: "center", // "left", "center" o "right"
      backgroundColor: "#84cc16",
    }).showToast();
  };

  /**
   * Navega al chat del jugador.
   */
  const handleChat = () => {
    const username = JSON.parse(localStorage.getItem("user")).name;
    navigate(`/playerChat/${username}`);
  };

  const translatePosition = (position) => {
    switch (position) {
      case "goalkeeper":
        return "Portera";
      case "defender":
        return "Defensora";
      case "midfielder":
        return "Mediocampista";
      case "attacker":
        return "Atacante";
      default:
        return position;
    }
  };

  const translateFoot = (foot) => {
    switch (foot) {
      case "right":
        return "Derecha";
      case "left":
        return "Izquierda";
      case "both":
        return "Ambidiestro";
      default:
        return foot;
    }
  };

  const translatePositionEs = (position) => {
    switch (position) {
      case "PO":
        return "Portera";
      case "LI":
        return "Lateral Izquierda";
      case "LD":
        return "Lateral Derecha";
      case "DFC":
        return "Defensa Central";
      case "MCD":
        return "Mediocampista Defensivo";
      case "MCO":
        return "Mediocampista Ofensivo";
      case "MC":
        return "Mediocampista Central";
      case "SD":
        return "Segunda Delantera";
      case "EI":
        return "Extrema Izquierda";
      case "ED":
        return "Extrema Derecha";
      case "MI":
        return "Mediocampista Izquierda";
      case "MD":
        return "Mediocampista Derecha";
      case "DC":
        return "Delantera Central";
      default:
        return position;
    }
  };

  return (
    <div>
      <NavbarDashboard />
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 bg-lime-500 text-[#000] rounded-md font-medium py-3 px-6 flex items-center hover:scale-105 duration-300 my-2"
        >
          <IoIosArrowRoundBack className="mr-2" /> Volver
        </button>
        <h1 className="my-20 md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
          Pérfil de la Jugadora
        </h1>
        <div className="p-8 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center justify-center space-x-8 hover:scale-105 duration-300">
          {player.photo && (
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={player.photo}
                className="w-[300px] h-[600px] md:w-[500px] md:h-[500px] rounded-lg"
                alt={`${player.name}`}
              />
            </div>
          )}
          <div className="text-black text-lg md:text-xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {player.name}
            </h2>
            <p className="mb-2">
              <span className="font-bold">Edad:</span> {player.age}
            </p>
            <p className="mb-2">
              <span className="font-bold">Peso:</span> {player.weight} kg
            </p>
            <p className="mb-2">
              <span className="font-bold">Altura:</span> {player.height} cm
            </p>
            <p className="mb-2">
              <span className="font-bold">Pie Hábil:</span>{" "}
              {translateFoot(player.foot)}
            </p>
            <p className="mb-2">
              <span className="font-bold">Posición General:</span>{" "}
              {translatePosition(player.genposition)}
            </p>
            <p className="mb-2">
              <span className="font-bold">Posiciones Específicas:</span>
            </p>
            <ul className="list-disc list-inside mb-4">
              {player.natposition.map((position, index) => (
                <li key={index}>{translatePositionEs(position)}</li>
              ))}
            </ul>
            <p className="mb-2">
              <span className="font-bold">Descripción:</span>
            </p>
            <p className="p-3 flex w-full rounded-md text-black border border-lime-500 mt-2">
              {player.description}
            </p>
            <p className="mb-2">
              <span className="font-bold">Años de experiencia:</span>{" "}
              {player.yearsexp}
            </p>
            <p className="mb-2">
              <span className="font-bold">Puntaje de Aceptación sugerido:</span>{" "}
              {(player.score * 100).toFixed(1)}%
            </p>
            <button
              className="bg-lime-500 text-[#000] w-full rounded-md font-medium my-6 mx-auto py-3 hover:scale-105 duration-300"
              onClick={handleMessage}
            >
              Contactar
            </button>
          </div>
        </div>
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            Videos Subidos
          </h2>
          {player.videos && player.videos.length > 0 ? (
            <ul className="space-y-4">
              {player.videos.map((video, index) => (
                <li
                  key={index}
                  className="bg-black shadow-md rounded-lg p-4 hover:scale-105 duration-300"
                >
                  <video
                    src={video}
                    controls
                    className="w-full h-[300px] rounded-lg"
                  />
                  <p className="mt-2 text-center">{video.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No hay videos subidos.</p>
          )}
        </div>
        <IoChatbubbleEllipses
          className="fixed bottom-4 right-4 text-6xl text-lime-500 hover:scale-105 duration-300 cursor-pointer"
          title="Chat"
          onClick={handleChat}
        />
      </div>
      <Footer />
    </div>
  );
};

export default PlayerInfo;
