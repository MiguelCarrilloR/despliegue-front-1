import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const handleIconClick = async (event) => {
    setAnchorEl(event.currentTarget); // Establece el elemento de anclaje para el Popover
    setLoading(true); // Muestra un estado de carga mientras se hace la solicitud

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/algorithm/recommendation/${
          JSON.parse(localStorage.getItem("user"))._id
        }`
      );
      setInfo(response.data.recommendation);
    } catch (error) {
      setInfo("Error al obtener la información."); // Maneja errores
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
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
      const experience = playerInfo.yearsexp;
      const videoUploaded = playerInfo.videos.length > 0 ? 1 : 0;
      const dominantFoot = playerInfo.foot;
      const versatility = playerInfo.natposition.length > 1 ? 1 : 0;

      const payload = {
        email: playerInfo.email,
        position,
        height: playerInfo.height,
        weight: playerInfo.weight,
        experience,
        videoUploaded,
        ambidextrous: playerInfo.dominantFoot === "both" ? 1 : 0,
        dominantFoot,
        versatility,
      };

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
        setProgressValue(Math.round(playerInfo.score * 100) || 0);
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
    <div className="my-20">
      <div className="shadow-lg p-6 border rounded-lg max-w-[1240px] mx-auto mb-8">
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
          Mi perfil
        </h1>
      </div>
      <div className="max-w-[1240px] mx-auto mb-8 px-4">
        <h2 className="text-lg font-semibold mb-4">
          Porcentaje de Aceptación:
        </h2>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full mr-2">
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-lime-500 h-4 rounded-full"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center mt-2 sm:mt-0 min-w-[35px]">
            <span className="text-gray-700">{`${progressValue}%`}</span>
            <FaInfoCircle
              className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleIconClick}
            />
          </div>
        </div>

        {openPop && (
          <div
            className="absolute z-10 bg-white shadow-lg p-4 rounded-lg mt-2"
            style={{
              top: anchorEl?.getBoundingClientRect().bottom + window.scrollY,
              left: anchorEl?.getBoundingClientRect().left,
            }}
          >
            {loading ? (
              <p className="text-sm text-gray-500">Cargando...</p>
            ) : (
              <p className="text-sm text-gray-700">{info}</p>
            )}
            <button
              className="mt-2 text-xs text-lime-500 hover:underline"
              onClick={handleClosePop}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 shadow-lg p-6 border rounded-lg hover:scale-105 duration-300 relative">
          <div className="flex justify-center items-center">
            {playerInfo ? (
              <img
                src={playerInfo.photo}
                alt="Player"
                className="rounded-full w-64 h-64 object-cover shadow-lg"
              />
            ) : (
              <p>Cargando imagen...</p>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {playerInfo ? (
              <>
                <h1 className="text-3xl font-bold mb-4">
                  Información de la Jugadora
                </h1>
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {playerInfo.name}
                </h2>
                <p className="mb-2">
                  <span className="font-bold">Tipo de Identificación:</span>{" "}
                  {translateTypeId(playerInfo.typeid)}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Número de Identificación:</span>{" "}
                  {playerInfo.identification}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Edad:</span> {playerInfo.age}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Peso:</span> {playerInfo.weight}{" "}
                  kg
                </p>
                <p className="mb-2">
                  <span className="font-bold">Altura:</span> {playerInfo.height}{" "}
                  cm
                </p>
                <p className="mb-2">
                  <span className="font-bold">Pie Hábil:</span>{" "}
                  {translateFoot(playerInfo.foot)}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Posición Géneral:</span>{" "}
                  {translatePosition(playerInfo.genposition)}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Posiciones Específicas:</span>
                </p>
                <ul className="list-disc list-inside mb-4">
                  {playerInfo.natposition.map((position, index) => (
                    <li key={index}>{translatePositionEs(position)}</li>
                  ))}
                </ul>
                <p className="mb-2">
                  <span className="font-bold">Descripción:</span>
                </p>
                <p className="p-3 flex w-full rounded-md text-black border border-lime-500 mt-2">
                  {playerInfo.description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Años de experiencia:</span>{" "}
                  {playerInfo.yearsexp}
                </p>
                <button
                  onClick={handleClickOpen}
                  className="bg-lime-500 text-[#000] w-full rounded-md font-medium my-6 mx-auto py-3 hover:scale-105 duration-300"
                >
                  Actualizar perfil
                </button>
              </>
            ) : (
              <p>Cargando información...</p>
            )}
          </div>
        </div>
      </div>
      <div className="shadow-lg p-6 border rounded-lg max-w-[1240px] mx-auto mb-8 my-20 hover:scale-105 duration-300">
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
          Mis videos
        </h1>
        {playerInfo && playerInfo.videos && playerInfo.videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
            {playerInfo.videos.map((video, index) => (
              <Card key={index} className="hover:scale-105 duration-300">
                <CardMedia
                  component="iframe"
                  height="300"
                  width="100%"
                  src={video}
                  title={`Video ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Video {index + 1}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center my-10">
            Aún no tienes videos subidos, ¡sube para mejorar tu perfil!
          </p>
        )}
        <input
          accept="video/*"
          style={{ display: "none" }}
          id="upload-video"
          type="file"
          onChange={handleUploadVideo}
        />
        <label htmlFor="upload-video">
          <Button
            variant="contained"
            color="success"
            component="span"
            className="bg-lime-500 text-[#000] w-full rounded-md font-medium my-6 mx-auto py-3 hover:scale-105 duration-300"
          >
            Subir Video
          </Button>
        </label>
        {isUploading && (
          <Box display="flex" alignItems="center" mt={2}>
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        )}
      </div>
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
      <IoChatbubbleEllipses
        className="fixed bottom-4 right-4 text-6xl text-lime-500 hover:scale-105 duration-300 cursor-pointer"
        title="Chat"
        onClick={handleChat}
      />
    </div>
  );
}

export default PlayerProfile;
