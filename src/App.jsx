import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./utils/VerifyEmailPage";
import UnauthorizedPage from "./utils/UnauthorizedPage";
import RecoverPasswordPage from "./utils/RecoverPasswordPage";
import ResetPasswordPage from "./utils/ResetPasswordPage";
import CompleteProfilePlayerPage from "./pages/CompleteProfilePlayerPage";
import CompleteProfileScoutPage from "./pages/CompleteProfileScoutPage";
import ScoutDashboardPage from "./pages/ScoutDashboardPage";
import PlayerInfo from "./components/Scout/PlayerInfo";
import PlayerDashboardPage from "./pages/PlayerDashboardPage";
import Chat from "./components/Chat/Chat";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MessageList from "./components/Admin/MessageList";
import AboutPage from "./pages/AboutPage";
import ScoutInfoPage from "./pages/ScoutInfoPage";
import PlayerInfoPage from "./pages/PlayerInfoPage";

/**
 * Define las rutas de la aplicación.
 * @constant {Object[]} routes - Lista de rutas de la aplicación.
 * @property {string} path - La ruta URL.
 * @property {React.Element} element - El componente a renderizar para esa ruta.
 */
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/verify-email", element: <VerifyEmailPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  { path: "/recover", element: <RecoverPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/about-players", element: <PlayerInfoPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/about-scouts", element: <ScoutInfoPage /> },
  { path: "/player", element: <CompleteProfilePlayerPage /> },
  { path: "/scout", element: <CompleteProfileScoutPage /> },
  { path: "/scout-dashboard", element: <ScoutDashboardPage /> },
  { path: "/player/:id", element: <PlayerInfo /> },
  { path: "/player-dashboard", element: <PlayerDashboardPage /> },
  { path: "/playerChat/:username", element: <Chat /> },
  { path: "/admin", element: <AdminDashboardPage /> },
  { path: "/admin-messages", element: <MessageList /> },
];

/**
 * Crea el router utilizando las rutas definidas.
 * @constant {Object} router - Instancia del router de la aplicación.
 */
const router = createBrowserRouter(routes);

/**
 * Componente principal de la aplicación.
 * @returns {React.Element} El elemento que representa la aplicación.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
