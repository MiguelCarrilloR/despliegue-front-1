import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

/**
 * Configuración de Firebase para la aplicación.
 * @constant {Object} firebaseConfig - Configuración de Firebase.
 * @property {string} apiKey - La clave API para autenticar las solicitudes.
 * @property {string} authDomain - El dominio de autenticación de la aplicación.
 * @property {string} projectId - El ID del proyecto de Firebase.
 * @property {string} storageBucket - El bucket de almacenamiento de Firebase.
 * @property {string} messagingSenderId - El ID del remitente de mensajes.
 * @property {string} appId - El ID de la aplicación de Firebase.
 * @property {string} measurementId - El ID de medición para Google Analytics.
 */
const firebaseConfig = {
  apiKey: "AIzaSyB1LVNBa4sYq8Qr9T3U_vr28m5zJLVEy8w",
  authDomain: "videos-promesas.firebaseapp.com",
  projectId: "videos-promesas",
  storageBucket: "videos-promesas.appspot.com",
  messagingSenderId: "241686012320",
  appId: "1:241686012320:web:a7dde5820e027c114384c5",
  measurementId: "G-10RFNHYPMB",
};

/**
 * Inicializa la aplicación Firebase.
 * @constant {Object} app - Instancia de la aplicación Firebase.
 */
const app = initializeApp(firebaseConfig);

/**
 * Obtiene el almacenamiento de Firebase.
 * @constant {Object} storage - Instancia de Firebase Storage.
 */
const storage = getStorage(app);

export { storage };
