import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Upload, Camera, ChevronDown } from 'lucide-react';

/**
 * Componente para completar el perfil de un jugador.
 * Permite ingresar información personal y subir una foto de perfil.
 *
 * @component
 * @returns {JSX.Element} - Renderiza el formulario para completar el perfil.
 */
const PlayerForm = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [genposition, setGenPosition] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [yearsexp, setYearsExp] = useState("");
  const [description, setDescription] = useState("");
  const [foot, setFoot] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");


  const positionMapping = {
    goalkeeper: [{ value: "PO", label: "Portera" }],
    defender: [
      { value: "DFC", label: "Defensora Central" },
      { value: "LI", label: "Lateral Izquierda" },
      { value: "LD", label: "Lateral Derecha" },
    ],
    midfielder: [
      { value: "MCD", label: "Mediocampista Defensiva" },
      { value: "MCO", label: "Mediocampista Ofensiva" },
      { value: "MI", label: "Mediocampista Izquierda" },
      { value: "MD", label: "Mediocampista Derecha" },
      { value: "MC", label: "Mediocampista Central" },
    ],
    attacker: [
      { value: "EI", label: "Extrema Izquierda" },
      { value: "ED", label: "Extrema Derecha" },
      { value: "SD", label: "Delantera" },
      { value: "DC", label: "Delantera Centro" },
    ],
  };

  /**
   * Maneja el cambio de los checkboxes de posiciones.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio.
   */
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked && selectedPositions.length >= 3) {
      Toastify({
        text: "Solo puedes seleccionar hasta 3 posiciones.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#A52A2A",
      }).showToast();
      return;
    }

    if (checked) {
      setSelectedPositions([...selectedPositions, value]);
    } else {
      setSelectedPositions(
        selectedPositions.filter((position) => position !== value)
      );
    }
  };

  const handleGenPositionChange = (e) => {
    setGenPosition(e.target.value);
    setSelectedPositions([]); // Limpia las posiciones específicas seleccionadas
  };

  // Redireccionamiento
  const navigate = useNavigate();

  /**
   * Maneja la carga de la imagen utilizando dropzone.
   *
   * @param {File[]} acceptedFiles - Archivos aceptados.
   */
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  /**
   * Sube la imagen a Cloudinary y devuelve la URL de la imagen subida.
   *
   * @param {File} file - Archivo de imagen a subir.
   * @returns {Promise<string|null>} - URL de la imagen subida o null si hubo un error.
   */
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "keuo0how");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CLOUDINARY_URL}`,
        formData
      );
      const uploadedImageUrl = response.data.secure_url;
      console.log("URL de la imagen subida a Cloudinary:", uploadedImageUrl);
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      return null;
    }
  };

  // useEffect para controlar el acceso basado en el rol del usuario
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
  }, [navigate]);

  /**
   * Envía los datos del formulario al backend.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const sentData = async (e) => {
    e.preventDefault();

    if (selectedPositions.length === 0) {
      Toastify({
        text: "Debes seleccionar al menos una posición específica.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#A52A2A",
      }).showToast();
      return;
    }

    let profileImageUrl = null;
    if (imageFile) {
      profileImageUrl = await uploadImageToCloudinary(imageFile);
    }

    if (profileImageUrl) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/api/user/update-user`, {
          email: JSON.parse(localStorage.getItem("user")).email,
          weight: weight,
          height: height,
          genposition: genposition,
          natposition: selectedPositions,
          yearsexp: yearsexp,
          description: description,
          foot: foot,
          age: age,
          phone: phone,
          photo: profileImageUrl,
        })
        .then((response) => {
          if (response.status === 200) {
            Toastify({
              text: "¡Perfil completado!",
              duration: 3000,
              close: true,
              gravity: "top", // "top" o "bottom"
              position: "center", // "left", "center" o "right"
              backgroundColor: "#84cc16",
            }).showToast();
            navigate("/player-dashboard");
          } else {
            Toastify({
              text: "Error",
              duration: 3000,
              close: true,
              gravity: "top", // "top" o "bottom"
              position: "center", // "left", "center" o "right"
              backgroundColor: "#A52A2A",
            }).showToast();
          }
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario:", error);
          Toastify({
            text: "Error al actualizar el usuario",
            duration: 3000,
            close: true,
            gravity: "top", // "top" o "bottom"
            position: "center", // "left", "center" o "right"
            backgroundColor: "#A52A2A",
          }).showToast();
        });
    } else {
      Toastify({
        text: "Error al subir la imagen. Por favor, inténtalo de nuevo.",
        duration: 3000,
        close: true,
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
        backgroundColor: "#A52A2A",
      }).showToast();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-lime-400 to-lime-600 p-8 my-18">
            <h1 className="text-3xl md:text-4xl font-bold text-white my-3">
              Completa tu perfil
            </h1>
            <p className="text-lime-50 mt-2">
              Completa tu información para mejorar tu visibilidad
            </p>
          </div>

          {/* Form */}
          <form onSubmit={sentData} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso
                  </label>
                  <input
                    type="number"
                    placeholder="Kg"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200"
                    required
                    min="40"
                    max="220"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura
                  </label>
                  <input
                    type="number"
                    placeholder="Cm"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200"
                    required
                    min="140"
                    max="210"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                {/* General Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posición General
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 appearance-none"
                      required
                      onChange={handleGenPositionChange}
                    >
                      <option value="">Selecciona tu posición</option>
                      <option value="goalkeeper">Portera</option>
                      <option value="defender">Defensora</option>
                      <option value="midfielder">Mediocampista</option>
                      <option value="attacker">Atacante</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edad
                  </label>
                  <input
                    type="number"
                    placeholder="Años"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200"
                    required
                    min="18"
                    max="40"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200"
                    required
                    pattern="\d{7,10}" // Solo acepta números entre 7 y 10 dígitos
                    title="El teléfono debe contener entre 7 y 10 números."
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Specific Positions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posiciones Específicas
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {(positionMapping[genposition] || []).map(({ value, label }) => (
                      <label key={value} className="flex items-center">
                        <input
                          type="checkbox"
                          value={value}
                          checked={selectedPositions.includes(value)}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-lime-600 border-gray-300 rounded focus:ring-lime-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                    {selectedPositions.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        Posiciones seleccionadas: {selectedPositions.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Años de experiencia
                  </label>
                  <input
                    type="number"
                    placeholder="Años"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200"
                    required
                    min="0"
                    max="20"
                    onChange={(e) => setYearsExp(e.target.value)}
                  />
                </div>

                {/* Foot */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pie de apoyo
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 appearance-none"
                      required
                      onChange={(e) => setFoot(e.target.value)}
                    >
                      <option value="">Selecciona tu pie de apoyo</option>
                      <option value="right">Derecho</option>
                      <option value="left">Izquierdo</option>
                      <option value="both">Ambos</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="mt-6 space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  placeholder="Escribe una breve descripción"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 h-32"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto de perfil
                </label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-lime-500 transition-colors cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-gray-500">Solo archivos JPEG o PNG</p>
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <img
                      src={imageUrl}
                      alt="Vista previa"
                      className="w-32 h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-8 w-full bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold py-4 rounded-lg hover:from-lime-600 hover:to-lime-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Completar perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
