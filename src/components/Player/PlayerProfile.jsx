import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageCircle,
  Upload,
  Edit2,
  User,
  Weight,
  Ruler,
  Trophy,
  Footprints,
  Award,
  Activity,
  Calendar,
  FileText,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ProgressBarSection from "./ProgressBarSection";
import UpdateProfileModal from "./UpdateProfileModal";

function PlayerProfile() {
  const [playerInfo, setPlayerInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [progressValue, setProgressValue] = useState(0);
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Para manejar el estado del Popover
  const [info, setInfo] = useState(""); // Almacena la información traída del backend
  const [loading, setLoading] = useState(false); // Estado de carga para mostrar un indicador

  const handleChat = () => {
    const username = JSON.parse(localStorage.getItem("user")).name;
    navigate(`/playerChat/${username}`);
  };

  const handleClosePop = () => {
    setAnchorEl(null); // Cierra el Popover
  };

  const openPop = Boolean(anchorEl);

  const calculatePercentage = async (playerInfo) => {
    // Example calculation logic - replace with actual calculation method
    const newPercentage = Math.floor(Math.random() * 100);
    setProgressValue(newPercentage);
  };


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userRole = JSON.parse(user).role;
      if (userRole !== "player") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }

    const fetchPlayerInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/playerId/${userId}`
        );
        const playerInfo = response.data;
        console.log("Player Info:", playerInfo);

        setPlayerInfo(playerInfo);
        setPositions(playerInfo.natposition || []);
        setProgressValue(Math.round(playerInfo.score) || 0);
      } catch (error) {
        console.error("Error fetching player info:", error);
      }
    };

    const init = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/playerId/${userId}`
        );
        const playerInfo = response.data;
        await fetchPlayerInfo(); // Luego obtener la información del jugador actualizada
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    if (userId) {
      init();
    }
  }, [userId, navigate]);

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
        return "Mediocampista Defensiva";
      case "MCO":
        return "Mediocampista Ofensiva";
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

  const handleClickOpen = () => {
    setOpen(true);
    setUpdatedInfo(playerInfo);
    setPositions(playerInfo.natposition);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setPositions((prev) =>
      prev.includes(value)
        ? prev.filter((pos) => pos !== value)
        : [...prev, value]
    );
  };

  const uploadVideoToFirebase = async (file) => {
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progreso de la carga
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log(`Progreso de la carga: ${progress}%`);
        },
        (error) => {
          console.error("Error al subir el video a Firebase:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("URL del video subido a Firebase:", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleUploadVideo = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      Toastify({
        text: "Por favor, selecciona un archivo de video.",
        duration: 3000,
        close: true,
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    // Validar el tipo de archivo
    if (file.type !== "video/mp4") {
      Toastify({
        text: "Solo se permiten archivos de video MP4.",
        duration: 3000,
        close: true,
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
        backgroundColor: "#FFD700",
      }).showToast();
      return;
    }

    // Crear una URL temporal para el archivo
    const videoURL = URL.createObjectURL(file);
    const videoElement = document.createElement("video");

    videoElement.src = videoURL;

    // Validar la duración del video
    videoElement.onloadedmetadata = async () => {
      const duration = videoElement.duration;
      if (duration > 120) {
        Toastify({
          text: "El video no puede exceder los 2 minutos.",
          duration: 3000,
          close: true,
          gravity: "top", // "top" o "bottom"
          position: "center", // "left", "center" o "right"
          backgroundColor: "#FFD700",
        }).showToast();
        return;
      }

      setIsUploading(true);
      setProgress(0); // Resetear el progreso

      const uploadedVideoUrl = await uploadVideoToFirebase(file);
      if (uploadedVideoUrl) {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          const userId = user._id;
          const email = user.email;

          // Obtén la información del usuario para actualizar el arreglo de videos
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/playerId/${userId}`
          );

          const currentVideos = response.data.videos || [];
          const updatedVideos = [...currentVideos, uploadedVideoUrl];

          // Actualiza la base de datos con el nuevo arreglo de videos
          await axios.put(`${import.meta.env.VITE_API_URL}/api/user/update-user/`, {
            email: email,
            videos: updatedVideos,
          });

          console.log("Video guardado en la base de datos:", updatedVideos);
          Toastify({
            text: "Video subido y guardado correctamente.",
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
            backgroundColor: "#84cc16",
          }).showToast();
          // Actualiza el estado de playerInfo con los nuevos videos
          setPlayerInfo((prev) => ({
            ...prev,
            videos: updatedVideos,
          }));
        } catch (error) {
          console.error(
            "Error al guardar el video en la base de datos:",
            error
          );
          Toastify({
            text: "Hubo un error al guardar el video en la base de datos.",
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
            backgroundColor: "#DC143C",
          }).showToast();
        } finally {
          setIsUploading(false);
        }
      }
    };
  };

  const handleSubmit = async (updatedData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update-user/`,
        updatedData
      );
      setPlayerInfo(updatedData);
      setOpen(false);
    } catch (error) {
      console.error("Error updating player info:", error);
    }
  };


  const positionOptions = [
    "PO",
    "LI",
    "LD",
    "DFC",
    "MCD",
    "MCO",
    "MC",
    "SD",
    "EI",
    "ED",
    "MI",
    "MD",
    "DC",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-lime-400 to-lime-600 h-32 relative">
            <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
              Mi Perfil
            </h1>
          </div>

          {/* Progress Bar Section */}
          <ProgressBarSection playerInfo={playerInfo} />
        </div>
      </div>

      {/* Main Profile Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left Column - Photo */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            {playerInfo ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={playerInfo.photo}
                    alt="Player"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                  />

                </div>
                <h2 className="text-2xl font-bold text-gray-800">{playerInfo.name}</h2>
                <p className="text-lime-600 font-medium">{translatePosition(playerInfo.genposition)}</p>
              </div>
            ) : (
              <div className="animate-pulse">
                <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mt-4 mx-auto w-32"></div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {playerInfo ? (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <User className="h-5 w-5 text-lime-600 mb-2" />
                    <p className="text-sm text-gray-500">Edad</p>
                    <p className="text-lg font-semibold">{playerInfo.age} años</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <Weight className="h-5 w-5 text-lime-600 mb-2" />
                    <p className="text-sm text-gray-500">Peso</p>
                    <p className="text-lg font-semibold">{playerInfo.weight} kg</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <Ruler className="h-5 w-5 text-lime-600 mb-2" />
                    <p className="text-sm text-gray-500">Altura</p>
                    <p className="text-lg font-semibold">{playerInfo.height} cm</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <Footprints className="h-5 w-5 text-lime-600 mb-2" />
                    <p className="text-sm text-gray-500">Pie Hábil</p>
                    <p className="text-lg font-semibold">{translateFoot(playerInfo.foot)}</p>
                  </div>
                </div>

                {/* Training & Health Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-lime-600" />
                    Entrenamiento y Salud
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Horas de Entrenamiento Semanal</p>
                      <p className="text-lg font-semibold">{playerInfo?.trainingHoursPerWeek} horas</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Historial de Lesiones</p>
                      <p className="text-lg font-semibold">{playerInfo?.injuryHistory || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Experience Timeline */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-lime-600" />
                    Experiencia
                  </h3>
                  <div className="space-y-4">
                    {playerInfo?.yearsexp?.map((exp, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800">{exp.club}</p>
                            <p className="text-sm text-gray-600">
                              {exp.startYear} - {exp.endYear || 'Presente'}
                            </p>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-lime-600" />
                    Logros
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playerInfo?.achievements?.map((achievement, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                          {achievement.type === 'trophy' && <Trophy className="h-4 w-4 text-yellow-500" />}
                          {achievement.type === 'medal' && <Award className="h-4 w-4 text-blue-500" />}
                          {achievement.type === 'star' && <Activity className="h-4 w-4 text-purple-500" />}
                          <p className="font-semibold">{achievement.title}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{achievement.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Positions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-lime-600" />
                    Posiciones Específicas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {playerInfo.natposition.map((position, index) => (
                      <span
                        key={index}
                        className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {translatePositionEs(position)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-lime-600" />
                    Descripción
                  </h3>
                  <p className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed">
                    {playerInfo.description}
                  </p>
                </div>


                <button
                  onClick={handleClickOpen}
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white rounded-xl py-3 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Actualizar perfil
                </button>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-lime-600" />
            Mis Videos
          </h2>

          {playerInfo?.videos?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerInfo.videos.map((video, index) => (
                <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <video
                    src={video}
                    controls
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">Video {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 my-8">
              Aún no tienes videos subidos, ¡sube para mejorar tu perfil!
            </p>
          )}

          <div className="mt-6">
            <button
              onClick={() => document.getElementById('upload-video').click()}
              className="w-full bg-lime-500 hover:bg-lime-600 text-white rounded-xl py-4 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="h-5 w-5" />
              Subir Video
            </button>
            <input
              id="upload-video"
              type="file"
              accept="video/*"
              onChange={handleUploadVideo}
              className="hidden"
            />
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-lime-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Subiendo... {Math.round(progress)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={handleChat}
        className="fixed bottom-8 right-8 bg-lime-500 hover:bg-lime-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Info Popup */}
      {openPop && (
        <div
          className="absolute z-50 bg-white rounded-xl shadow-2xl p-4 max-w-xs"
          style={{
            top: anchorEl?.getBoundingClientRect().bottom + window.scrollY,
            left: anchorEl?.getBoundingClientRect().left,
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-500" />
            </div>
          ) : (
            <p className="text-sm text-gray-700">{info}</p>
          )}
          <button
            className="mt-2 text-sm text-lime-600 hover:text-lime-700 font-medium"
            onClick={handleClosePop}
          >
            Cerrar
          </button>
        </div>

      )}

      <UpdateProfileModal
        open={open}
        handleClose={handleClose}
        playerInfo={playerInfo}
        onSubmit={handleSubmit}
      />



    </div>
  );
}

export default PlayerProfile;
