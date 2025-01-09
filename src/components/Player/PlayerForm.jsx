import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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

  /**
   * Maneja el cambio de los checkboxes de posiciones.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio.
   */
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPositions([...selectedPositions, value]);
    } else {
      setSelectedPositions(
        selectedPositions.filter((position) => position !== value)
      );
    }
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
    <div className="w-full py-16 text-white px-4">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 my-4">
          <div className="flex justify-center items-center">
            <img
              className="w-full h-auto rounded-lg"
              src={"https://i.imgur.com/XKDOHE4.jpg"}
              alt="/"
            />
          </div>
        </div>
        <div className="my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-black">
            Completa tu perfil
          </h1>
          <form action="" className="form grid" onSubmit={sentData}>
            <div className="sm:flex-row items-center justify-between w-full my-8">
              <label className="text-black">Peso</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="number"
                placeholder="Kg"
                id="weight"
                required
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
              <label className="text-black my-8">Altura</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="number"
                placeholder="Cm"
                id="height"
                required
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
              <label className="text-black my-8">Posición General</label>
              <select
                id="genposition"
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                required
                onChange={(e) => {
                  setGenPosition(e.target.value);
                }}
              >
                <option value="">Selecciona tu posición</option>
                <option value="goalkeeper">Portera</option>
                <option value="defender">Defensora</option>
                <option value="midfielder">Mediocampista</option>
                <option value="attacker">Atacante</option>
              </select>
              <label className="text-black my-8">Posición Específica</label>
              <div className="p-3 flex flex-col w-full rounded-md text-black">
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="PO"
                    checked={selectedPositions.includes("PO")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Portera
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="LI"
                    checked={selectedPositions.includes("LI")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Lateral Izquierda
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="LD"
                    checked={selectedPositions.includes("LD")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Lateral Derecha
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="DFC"
                    checked={selectedPositions.includes("DFC")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Defensora Central
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="MI"
                    checked={selectedPositions.includes("MI")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Mediocampista Izquierda
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="MD"
                    checked={selectedPositions.includes("MD")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Mediocampista Derecha
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="MC"
                    checked={selectedPositions.includes("MC")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Mediocampista Central
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="SD"
                    checked={selectedPositions.includes("SD")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Delantera
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="DC"
                    checked={selectedPositions.includes("DC")}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Delantera Centro
                </label>
              </div>
              <label className="text-black my-8">Años de experiencia</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="number"
                placeholder="Años"
                id="yearsexp"
                required
                onChange={(e) => {
                  setYearsExp(e.target.value);
                }}
              />
              <label className="text-black my-8">Descripción</label>
              <textarea
                className="p-3 flex w-full h-40 rounded-md text-black border border-lime-500"
                placeholder="Escribe una breve descripción"
                id="description"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label className="text-black my-8">Pie de apoyo</label>
              <select
                id="foot"
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                required
                onChange={(e) => {
                  setFoot(e.target.value);
                }}
              >
                <option value="">Selecciona tu pie de apoyo</option>
                <option value="right">Derecho</option>
                <option value="left">Izquierdo</option>
                <option value="both">Ambos</option>
              </select>
              <label className="text-black my-8">Edad</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="number"
                placeholder="Años"
                id="age"
                required
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <label className="text-black my-8">Teléfono</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="tel"
                placeholder="Teléfono"
                id="phone"
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <label className="text-black my-8">Foto de perfil</label>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-lime-500 rounded-md"
            >
              <input
                {...getInputProps({
                  accept: "image/jpeg, image/png", // Solo aceptar archivos JPEG y PNG
                })}
              />
              <p className="text-black">
                Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                una imagen (solo JPEG o PNG).
              </p>
            </div>

            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
            <button
              type="submit"
              className="mt-8 p-3 w-full bg-lime-500 text-black font-bold rounded-md hover:bg-lime-600 transition duration-300"
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
