import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MessageCircle, Search, Filter, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';

const ScoutFilters = () => {
  const [players, setPlayers] = useState([]);
  const [maxAge, setMaxAge] = useState(27); // Estado para la edad máxima ajustable, inicializado al máximo
  const [maxWeight, setMaxWeight] = useState(100); // Estado para el peso máximo ajustable, inicializado al máximo
  const [maxHeight, setMaxHeight] = useState(200); // Estado para la altura máxima ajustable, inicializado al máximo
  const [position, setPosition] = useState(""); // Estado para la posición seleccionada
  const [foot, setFoot] = useState(""); // Estado para el pie hábil
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(9); // 3x3 grid por defecto
  
  // Calcular jugadoras a mostrar en la página actual
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  
  // Calcular número total de páginas
  const totalPages = Math.ceil(players.length / playersPerPage);
  
  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Opcional: hacer scroll al inicio del grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  
  // Ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };
  
  // Ir a la primera página
  const goToFirstPage = () => {
    paginate(1);
  };
  
  // Ir a la última página
  const goToLastPage = () => {
    paginate(totalPages);
  };
  
  // Generar array de números de página para mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Mostrar máximo 5 números de página
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };


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
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-16">
      {/* Profile Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-lime-500/10 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Mi Perfil de Reclutador
            </h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 p-6">
            <div className="lg:col-span-2 flex flex-col items-center">
              <div className="relative">
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-lime-500 text-white px-4 py-1 rounded-full text-sm">
                  Reclutador
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Tipo de ID</p>
                    <p className="font-medium">{translateTypeId(user.typeid)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Número de ID</p>
                    <p className="font-medium">{user.identification}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Edad</p>
                    <p className="font-medium">{user.age}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Género</p>
                    <p className="font-medium">{translateGenderScout(user.gender)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Organización</p>
                    <p className="font-medium">{user.organization}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Cargo</p>
                    <p className="font-medium">{user.position}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Players Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Lista de Jugadoras</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar jugadora..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold">Filtros</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Edad máxima</label>
                    <span className="text-sm text-gray-500">{maxAge} años</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="30"
                    value={maxAge}
                    onChange={handleAgeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Peso máximo</label>
                    <span className="text-sm text-gray-500">{maxWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={maxWeight}
                    onChange={handleWeightChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">Altura máxima</label>
                    <span className="text-sm text-gray-500">{maxHeight} cm</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    value={maxHeight}
                    onChange={handleHeightChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lime-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Posición</label>
                  <select
                    value={position}
                    onChange={handlePositionChange}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="">Todas</option>
                    <option value="goalkeeper">Portera</option>
                    <option value="defender">Defensora</option>
                    <option value="midfielder">Centrocampista</option>
                    <option value="attacker">Delantera</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pie Hábil</label>
                  <select
                    value={foot}
                    onChange={handleFootChange}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="">Cualquiera</option>
                    <option value="right">Derecha</option>
                    <option value="left">Izquierda</option>
                    <option value="both">Ambos</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Players Grid */}
            <div className="lg:w-3/4">
              {/* Grid de jugadoras */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPlayers.length > 0 ? (
                  currentPlayers.map((player) => (
                    <div key={player._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4">
                      <div className="relative mb-4">
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm">
                          {player.score !== undefined ? `${player.score.toFixed(1)}%` : 'N/A'}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-2">{player.name}</h3>

                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>Edad: {player.age} años</p>
                        <p>Altura: {player.height} cm</p>
                        <p>Peso: {player.weight} kg</p>
                        <p>Posición: {translatePosition(player.genposition)}</p>
                        <p>Pie Hábil: {translateFoot(player.foot)}</p>
                      </div>

                      <button
                        onClick={() => handleMoreInfoClick(player._id)}
                        className="w-full bg-lime-500 text-white rounded-lg py-2 px-4 hover:bg-lime-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Ver Perfil</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No hay jugadoras que coincidan con los filtros seleccionados.
                  </div>
                )}
              </div>

              {/* Paginación */}
              {players.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-1">
                    {/* Botón primera página */}
                    <button
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                      aria-label="Primera página"
                    >
                      <ChevronsLeft className="h-5 w-5" />
                    </button>

                    {/* Botón página anterior */}
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Números de página */}
                    {getPageNumbers().map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-3 py-2 rounded-md ${pageNumber === currentPage
                            ? 'bg-lime-500 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    {/* Botón página siguiente */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                      aria-label="Página siguiente"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Botón última página */}
                    <button
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                      aria-label="Última página"
                    >
                      <ChevronsRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              )}

              {/* Información sobre paginación */}
              {players.length > 0 && (
                <div className="mt-2 text-center text-sm text-gray-500">
                  Mostrando {indexOfFirstPlayer + 1}-{Math.min(indexOfLastPlayer, players.length)} de {players.length} jugadoras
                </div>
              )}

              {/* Selector de jugadoras por página */}
              {players.length > playersPerPage && (
                <div className="mt-4 flex justify-center items-center text-sm">
                  <span className="mr-2">Jugadoras por página:</span>
                  <select
                    value={playersPerPage}
                    onChange={(e) => {
                      setPlayersPerPage(Number(e.target.value));
                      setCurrentPage(1); // Volver a la primera página al cambiar
                    }}
                    className="border rounded py-1 px-2"
                  >
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={handleChat}
        className="fixed bottom-6 right-6 bg-lime-500 text-white p-4 rounded-full shadow-lg hover:bg-lime-600 transition-colors"
        title="Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ScoutFilters;
