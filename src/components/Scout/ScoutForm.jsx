import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
    <div className="w-full py-16 text-white px-4">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 my-4">
          <div className="flex justify-center items-center">
            <img
              className="w-full h-auto rounded-lg"
              src={"https://i.imgur.com/QyHpPxX.png"}
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
              <label className="text-black">Organización</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="text"
                placeholder="Ingresa el nombre de la Organización"
                id="organization"
                required
                onChange={(e) => {
                  setOrganization(e.target.value);
                }}
              />
              <label className="text-black my-8">Cargo</label>
              <input
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                type="text"
                placeholder="Ingresa tu cargo dentro de la Organización"
                id="position"
                required
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />

              <label className="text-black my-8">
                Licencia de entrenador o afiliación a la Organización
              </label>
              <input
                type="file"
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
                accept=".pdf,.doc,.docx,image/*"
                onChange={handleLicenseChange}
              />

              <label className="text-black my-8">Género</label>
              <select
                id="gender"
                className="p-3 flex w-full rounded-md text-black border border-lime-500"
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

              <label className="text-black my-8">Imagen de Perfil</label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-lime-500 p-4 text-center"
              >
                <input {...getInputProps()} />
                <p className="text-black">
                  Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                  una.
                </p>
              </div>

              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    className="max-w-xs mx-auto"
                  />
                </div>
              )}

              <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 px-6">
                Completar Perfil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScoutForm;
