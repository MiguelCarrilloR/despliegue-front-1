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
import { ArrowLeft, MessageCircle, Trophy, User, Calendar, Ruler, Weight, Footprints, MapPin, Clock, Star } from 'lucide-react';
import ExperienceAndAchievements from "./ExperienceAndAchievements";


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

  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-lime-600" />
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavbarDashboard />

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-4 bg-white text-gray-800 rounded-full font-medium py-2 px-4 flex items-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-lime-500 to-lime-600 h-32 md:h-48"></div>

            <div className="relative px-6 pb-8">
              {player.photo && (
                <div className="absolute -top-20 left-6 md:-top-24 md:left-8">
                  <img
                    src={player.photo}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                    alt={player.name}
                  />
                </div>
              )}

              <div className="pt-16 md:pt-20 ml-0 md:ml-44">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {player.name}
                </h1>
                <p className="text-lime-600 font-medium mt-1">
                  {translatePosition(player.genposition)}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Calendar} label="Edad" value={`${player.age} años`} />
                <StatCard icon={Weight} label="Peso" value={`${player.weight} kg`} />
                <StatCard icon={Ruler} label="Altura" value={`${player.height} cm`} />
                <StatCard icon={Footprints} label="Pie Hábil" value={translateFoot(player.foot)} />
              </div>

              <div className="mt-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-lime-600" />
                    Posiciones Específicas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {player.natposition.map((position, index) => (
                      <span
                        key={index}
                        className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {translatePositionEs(position)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-lime-600" />
                    Descripción
                  </h3>
                  <p className="bg-white border border-gray-100 rounded-xl p-6 text-gray-700 leading-relaxed shadow-sm">
                    {player.description}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  

                  <div className="bg-lime-50 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6 text-lime-600" />
                      <div>
                        <p className="text-sm text-gray-600">Puntaje de Aceptación</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(player.score).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="mt-8 bg-lime-600 text-white w-full rounded-xl font-medium py-4 hover:bg-lime-700 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  onClick={handleMessage}
                >
                  <Trophy className="h-5 w-5" />
                  Contactar Jugadora
                </button>
              </div>
            </div>
          </div>
           <ExperienceAndAchievements player={player} />         
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Videos Destacados
            </h2>
            {player.videos && player.videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {player.videos.map((video, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <video
                      src={video}
                      controls
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="p-4">
                      <p className="text-gray-700">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No hay videos subidos.</p>
            )}
          </div>
        </div>

        <button
          onClick={handleChat}
          className="fixed bottom-8 right-8 bg-lime-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PlayerInfo;
