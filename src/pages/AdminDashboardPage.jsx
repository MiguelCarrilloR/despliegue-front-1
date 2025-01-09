import React from "react";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import UserList from "../components/Admin/UserList";

/**
 * @function AdminDashboardPage
 * @description Componente que representa el panel de administración,
 * incluyendo la barra de navegación para administradores y la lista de usuarios.
 * @returns {JSX.Element} Componente que muestra la barra de navegación de administración y la lista de usuarios.
 */
function AdminDashboardPage() {
  return (
    <>
      <NavbarAdmin />
      <UserList />
    </>
  );
}

export default AdminDashboardPage;
