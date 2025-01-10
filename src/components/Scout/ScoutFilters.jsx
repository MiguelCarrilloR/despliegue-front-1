import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoChatbubbleEllipses } from "react-icons/io5";

const ScoutFilters = () => {
  const [players, setPlayers] = useState([]);
  const [maxAge, setMaxAge] = useState(27); // Estado para la edad máxima ajustable, inicializado al máximo
  const [maxWeight, setMaxWeight] = useState(100); // Estado para el peso máximo ajustable, inicializado al máximo
  const [maxHeight, setMaxHeight] = useState(200); // Estado para la altura máxima ajustable, inicializado al máximo
  const [position, setPosition] = useState(""); // Estado para la posición seleccionada
  const [foot, setFoot] = useState(""); // Estado para el pie hábil

  const navigate = useNavigate();

  const fetchPlayers = useCallback(async () => {
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/`);
      const playerData = response.data.filter(
        (player) =>
          player.role === "player" &&
          player.age <= maxAge &&
          player.weight <= maxWeight &&
          player.height <= maxHeight &&
          (position === "" || player.genposition === position) &&
          (foot === "" || player.foot === foot)
      );
      setPlayers(playerData);
    } catch (error) {
      console.error("Error al obtener la lista de jugadoras:", error);
    }
  }, [maxAge, maxWeight, maxHeight, position, foot]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const userRole = parsedUser.role;
      const userStatus = parsedUser.state;
  
      if (userRole !== "scout" || userStatus === "pending") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
    fetchPlayers();
  }, [fetchPlayers, navigate]);  

  const handleAgeChange = (event) => {
    setMaxAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setMaxWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setMaxHeight(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleFootChange = (event) => {
    setFoot(event.target.value);
  };

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

  const translateGenderScout = (gender) => {
    switch (gender) {
      case "man":
        return "Hombre";
      case "woman":
        return "Mujer";
      case "other":
        return "Otro";
      default:
        return gender;
    }
  };

  const handleMoreInfoClick = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="my-20 px-4">
      <div className="shadow-lg p-6 border rounded-lg max-w-[1240px] mx-auto mb-8">
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
          Mi perfil
        </h1>
      </div>
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 shadow-lg p-6 border rounded-lg hover:scale-105 duration-300 relative">
          <div className="flex justify-center items-center">
            <img
              src={JSON.parse(localStorage.getItem("user")).photo}
              alt="Player"
              className="rounded-full w-64 h-64 object-cover shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <>
              <h1 className="text-3xl font-bold mb-4">
                Información del reclutador
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {JSON.parse(localStorage.getItem("user")).name}
              </h2>
              <p className="mb-2">
                <span className="font-bold">Email:</span>{" "}
                {JSON.parse(localStorage.getItem("user")).email}
              </p>
              <p className="mb-2">
                <span className="font-bold">Tipo de Identificación:</span>{" "}
                {translateTypeId(
                  JSON.parse(localStorage.getItem("user")).typeid
                )}
              </p>
              <p className="mb-2">
                <span className="font-bold">Número de Identificación:</span>{" "}
                {JSON.parse(localStorage.getItem("user")).identification}
              </p>
              <p className="mb-2">
                <span className="font-bold">Edad:</span>{" "}
                {JSON.parse(localStorage.getItem("user")).age}
              </p>
              <p className="mb-2">
                <span className="font-bold">Género:</span>{" "}
                {translateGenderScout(
                  JSON.parse(localStorage.getItem("user")).gender
                )}
              </p>
              <p className="mb-2">
                <span className="font-bold">Organización:</span>{" "}
                {JSON.parse(localStorage.getItem("user")).organization}
              </p>
              <p className="mb-2">
                <span className="font-bold">Cargo:</span>{" "}
                {JSON.parse(localStorage.getItem("user")).position}
              </p>
              <p className="mb-2">
                <span className="font-bold">Teléfono:</span>{" "}
                {JSON.parse(localStorage.getItem("user")).phone}
              </p>
            </>
          </div>
        </div>
      </div>
      <div className="shadow-lg p-6 border rounded-lg max-w-[1240px] mx-auto mb-8 my-20">
        <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold py-2 text-center">
          Lista de Jugadoras
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row my-20">
        <div className="w-full lg:w-1/4 p-4 shadow-lg mb-6 lg:mb-0">
          <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Filtros de búsqueda
          </h2>

          <label className="text-black block mb-4">
            Edad máxima: {maxAge}
            <input
              type="range"
              min="18"
              max="30"
              value={maxAge}
              onChange={handleAgeChange}
              className="block mt-2 w-full appearance-none bg-gray-200 h-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </label>

          <label className="text-black block mb-4">
            Peso máximo: {maxWeight} kg
            <input
              type="range"
              min="0"
              max="100"
              value={maxWeight}
              onChange={handleWeightChange}
              className="block mt-2 w-full appearance-none bg-gray-200 h-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </label>

          <label className="text-black block mb-4">
            Altura máxima: {maxHeight} cm
            <input
              type="range"
              min="100"
              max="200"
              value={maxHeight}
              onChange={handleHeightChange}
              className="block mt-2 w-full appearance-none bg-gray-200 h-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </label>

          <label className="text-black block mb-4">
            Posición:
            <select
              value={position}
              onChange={handlePositionChange}
              className="p-3 flex w-full rounded-md text-black border border-lime-500 mt-2"
            >
              <option value="">Todas</option>
              <option value="goalkeeper">Portera</option>
              <option value="defender">Defensora</option>
              <option value="midfielder">Centrocampista</option>
              <option value="attacker">Delantera</option>
            </select>
          </label>

          <label className="text-black block mb-4">
            Pie Hábil:
            <select
              value={foot}
              onChange={handleFootChange}
              className="p-3 flex w-full rounded-md text-black border border-lime-500 mt-2"
            >
              <option value="">Cualquiera</option>
              <option value="right">Derecha</option>
              <option value="left">Izquierda</option>
              <option value="both">Ambos</option>
            </select>
          </label>
        </div>

        <div className="w-full lg:w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.length > 0 ? (
            players.map((player) => (
              <div
                key={player._id}
                className="p-4 bg-white shadow-md rounded-lg hover:scale-105 duration-300"
              >
                {player.name && (
                  <h2 className="text-black text-xl font-bold text-center">
                    {player.name}
                  </h2>
                )}
                {player.photo && (
                  <img
                    src={player.photo}
                    className="w-[200px] h-[200px] mx-auto my-4 rounded-lg"
                    alt={`${player.name}`}
                  />
                )}
                {player.age && <p className="text-black">Edad: {player.age}</p>}
                {player.weight && (
                  <p className="text-black">Peso: {player.weight} kg</p>
                )}
                {player.height && (
                  <p className="text-black">Altura: {player.height} cm</p>
                )}
                {player.genposition && (
                  <p className="text-black">
                    Posición: {translatePosition(player.genposition)}
                  </p>
                )}
                {player.foot && (
                  <p className="text-black">
                    Pie Hábil: {translateFoot(player.foot)}
                  </p>
                )}
                {player.score && (
                  <p className="text-black">
                    Puntaje de Aceptación: {(player.score * 100).toFixed(1)} %
                  </p>
                )}

                <button
                  onClick={() => handleMoreInfoClick(player._id)}
                  className="bg-lime-500 text-[#000] w-full rounded-md font-medium my-6 mx-auto py-3 hover:scale-105 duration-300"
                >
                  Más información
                </button>
              </div>
            ))
          ) : (
            <p>No hay jugadoras disponibles.</p>
          )}
        </div>
      </div>
      <IoChatbubbleEllipses
        className="fixed bottom-4 right-4 text-6xl text-lime-500 hover:scale-105 duration-300 cursor-pointer"
        title="Chat"
        onClick={handleChat}
      />
    </div>
  );
};

export default ScoutFilters;
