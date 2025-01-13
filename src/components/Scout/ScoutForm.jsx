import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Upload, User, Building, Briefcase, Phone, ImageIcon, Calendar, FileText } from 'lucide-react';

/**
 * Componente de formulario para scouts.
 * Permite a los scouts completar su perfil, incluyendo
 * información personal y la carga de documentos.
 *
 * @component
 * @returns {JSX.Element} - Renderiza el formulario de scout.
 */
const ScoutForm = () => {
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [licenseFile, setLicenseFile] = useState(null);

  const navigate = useNavigate();

  /**
   * Maneja el evento de arrastrar y soltar archivos.
   * @param {File[]} acceptedFiles - Archivos aceptados por el dropzone.
   */
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }, []);

  // Inicializa `getRootProps` y `getInputProps` con `useDropzone`
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  /**
   * Maneja el cambio en la selección de archivo de licencia.
   * @param {Event} e - El evento de cambio.
   */
  const handleLicenseChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseFile(file);
    }
  };

  /**
   * Sube un archivo a Firebase Storage.
   * @param {File} file - El archivo a subir.
   * @returns {Promise<string>} - URL del archivo subido.
   */
  const uploadFileToFirebase = async (file) => {
    const storageRef = ref(storage, `licenses/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Manejo del progreso de la carga
        },
        (error) => {
          console.error("Error al subir el archivo a Firebase:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  /**
   * Sube una imagen a Cloudinary.
   * @param {File} file - El archivo de imagen a subir.
   * @returns {Promise<string|null>} - URL de la imagen subida o null en caso de error.
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
  }, [navigate]);

  /**
   * Envía los datos del formulario al backend.
   * @param {Event} e - El evento de envío del formulario.
   */
  const sentData = async (e) => {
    e.preventDefault();

    let profileImageUrl = null;
    let licenseFileUrl = null;

    if (imageFile) {
      profileImageUrl = await uploadImageToCloudinary(imageFile);
    }

    if (licenseFile) {
      licenseFileUrl = await uploadFileToFirebase(licenseFile);
    }

    if (profileImageUrl && licenseFileUrl) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/api/user/update-user`, {
          email: JSON.parse(localStorage.getItem("user")).email,
          organization: organization,
          position: position,
          age: age,
          gender: gender,
          phone: phone,
          photo: profileImageUrl,
          license: licenseFileUrl,
          state: "pending",
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("user");
            Toastify({
              text: "¡Perfil completado!, por favor espera a que un administrador revise tu información y serás notificado de tu acceso.",
              duration: 3000,
              close: true,
              gravity: "top", // "top" o "bottom"
              position: "center", // "left", "center" o "right"
              backgroundColor: "#84cc16",
            }).showToast();
            navigate("/login");
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
        text: "Error al subir la imagen o el archivo de licencia. Por favor, inténtalo de nuevo.",
        duration: 3000,
        close: true,
        gravity: "top", // "top" o "bottom"
        position: "center", // "left", "center" o "right"
        backgroundColor: "#A52A2A",
      }).showToast();
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-green-50 to-lime-100 py-16 px-4"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto p-8 my-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Completa tu Perfil
          </h1>
          <p className="text-gray-600">
            Ayúdanos a conocerte mejor completando la siguiente información
          </p>
        </div>

        <form onSubmit={sentData} className="space-y-6">
          <div className="space-y-6">
            {/* Organization */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <Building className="w-5 h-5 text-lime-600" />
                Organización
              </label>
              <input
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                type="text"
                placeholder="Ingresa el nombre de la Organización"
                id="organization"
                required
                onChange={(e) => {
                  setOrganization(e.target.value);
                }}
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <Briefcase className="w-5 h-5 text-lime-600" />
                Cargo
              </label>
              <input
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                type="text"
                placeholder="Ingresa tu cargo dentro de la Organización"
                id="position"
                required
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
            </div>

            {/* License Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <FileText className="w-5 h-5 text-lime-600" />
                Licencia o Afiliación
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={handleLicenseChange}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <User className="w-5 h-5 text-lime-600" />
                Género
              </label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                required
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="">Selecciona tu género</option>
                <option value="man">Hombre</option>
                <option value="woman">Mujer</option>
                <option value="other">Otro</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <Calendar className="w-5 h-5 text-lime-600" />
                Edad
              </label>
              <input
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                type="number"
                placeholder="Años"
                id="age"
                min="18"
                max="80"
                required
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <Phone className="w-5 h-5 text-lime-600" />
                Teléfono
              </label>
              <input
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 transition-all"
                type="tel"
                placeholder="Teléfono"
                id="phone"
                required
                pattern="\d{7,10}"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium gap-2">
                <ImageIcon className="w-5 h-5 text-lime-600" />
                Imagen de Perfil
              </label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-lime-500 transition-colors cursor-pointer"
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-lime-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
                </p>
              </div>
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    className="max-w-xs mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          <button className="w-full bg-lime-500 text-white rounded-lg py-3 px-6 font-medium hover:bg-lime-600 transition-colors focus:ring-4 focus:ring-lime-200">
            Completar Perfil
          </button>
        </form>
      </div>
    </div>


  );
};

export default ScoutForm;
