import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Info,
  MessageCircle,
  Upload,
  Edit2,
  User,
  Weight,
  Ruler,
  Footprints,
  Award,
  CircleUserRound,
  FileText,
  Clock
} from 'lucide-react';
import {
  LinearProgress,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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

    const evaluateAlgorithm = async (playerInfo) => {
      // Transformar la información del jugador según las reglas especificadas
      const positionMap = {
        PO: 0,
        DFC: 1,
        LI: 2,
        LD: 2,
        MC: 3,
        MCD: 4,
        MCO: 5,
        MI: 6,
        MD: 6,
        EI: 6,
        ED: 6,
        SD: 7,
        DC: 7,
      };

      const position = positionMap[playerInfo.natposition[0]] || 0;
      const yearsexp = playerInfo.yearsexp;
      const videoUploaded = playerInfo.videos.length > 0 ? 1 : 0;
      const foot = playerInfo.foot;
      const versatility = playerInfo.natposition.length > 1 ? 1 : 0;

      const payload = {
        email: playerInfo.email,
        position,
        height: playerInfo.height / 100,
        weight: playerInfo.weight,
        yearsexp,
        videoUploaded,
        ambidextrous: playerInfo.dominantFoot === "both" ? 1 : 0,
        foot,
        versatility,
      };

      console.log("Payload:", payload);


      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/algorithm/assign-ranges`,
          payload
        );
      } catch (error) {
        console.error("Error evaluating algorithm:", error);
      }
    };

    const fetchPlayerInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/playerId/${userId}`
        );
        const playerInfo = response.data;
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
        await evaluateAlgorithm(playerInfo); // Evaluar el algoritmo primero
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

  const translateTypeId = (typeid) => {
    switch (typeid) {
      case "cc":
        return "Cédula de Ciudadanía";
      case "ti":
        return "Tarjeta de Identidad";
      case "ce":
        return "Cédula de Extranjería";
      case "p":
        return "Pasaporte";
      case "c":
        return "Contraseña";
      default:
        return typeid;
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

  const handleSubmit = async () => {
    try {
      const updatedData = { ...updatedInfo, natposition: positions };
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
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-lime-600" />
              <h2 className="text-lg font-semibold">Porcentaje de Aceptación</h2>
            </div>
            <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-lime-400 to-lime-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progressValue}%` }}
              >
                <span className="text-xs font-medium text-white">{`${progressValue}%`}</span>
              </div>
            </div>
          </div>
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

                {/* Experience */}
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-lime-600" />
                  <span className="font-medium">Años de experiencia:</span>
                  <span className="text-gray-700">{playerInfo.yearsexp}</span>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Actualiza tu Información</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            value={updatedInfo.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="age"
            label="Edad"
            type="number"
            fullWidth
            value={updatedInfo.age || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="weight"
            label="Peso"
            type="number"
            fullWidth
            value={updatedInfo.weight || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="height"
            label="Altura"
            type="number"
            fullWidth
            value={updatedInfo.height || ""}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="foot-label">Pie Hábil</InputLabel>
            <Select
              labelId="foot-label"
              name="foot"
              value={updatedInfo.foot || ""}
              onChange={handleChange}
              label="Pie Hábil"
            >
              <MenuItem value="right">Derecha</MenuItem>
              <MenuItem value="left">Izquierda</MenuItem>
              <MenuItem value="both">Ambidiestro</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="genposition-label">Posición Géneral</InputLabel>
            <Select
              labelId="genposition-label"
              name="genposition"
              value={updatedInfo.genposition || ""}
              onChange={handleChange}
              label="Posición Géneral"
            >
              <MenuItem value="goalkeeper">Portera</MenuItem>
              <MenuItem value="defender">Defensa</MenuItem>
              <MenuItem value="midfielder">Mediocampista</MenuItem>
              <MenuItem value="attacker">Atacante</MenuItem>
            </Select>
          </FormControl>
          <label className="text-black my-8">Posiciones Específicas</label>
          <FormGroup>
            {positionOptions.map((position) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={positions.includes(position)}
                    onChange={handleCheckboxChange}
                    value={position}
                  />
                }
                label={translatePositionEs(position)}
                key={position}
              />
            ))}
          </FormGroup>
          <TextField
            margin="dense"
            name="description"
            label="Descripción"
            type="text"
            fullWidth
            value={updatedInfo.description || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="yearsexp"
            label="Años de experiencia"
            type="number"
            fullWidth
            value={updatedInfo.yearsexp || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}

export default PlayerProfile;
