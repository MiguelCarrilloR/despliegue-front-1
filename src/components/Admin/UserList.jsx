import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * @function UserList
 * @description Componente que muestra una lista de usuarios con funcionalidades de filtrado,
 * visualización de detalles, activación/desactivación y eliminación de usuarios.
 * @returns {JSX.Element} Componente que renderiza la lista de usuarios y permite interacciones.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userRole = JSON.parse(user).role;
      if (userRole !== "admin") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/`)
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error obteniendo los datos:", error);
      });
  }, [navigate]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (role === "" || user.role === role)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, role, users]);

  const handleClickOpen = (user) => {
    setCurrentUser(user);
    setOpen(true);
    console.log(user);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser({});
  };

  const handleDelete = (email) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/user/`, { data: { email } })
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
      })
      .catch((error) => {
        console.error("Hubo un error eliminando el usuario:", error);
      });
  };

  const handleChangeState = async (email, currentState) => {
    const newState = currentState === "pending" ? "active" : "pending";
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/user/change-state`, {
        email,
        state: newState,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, state: newState } : user
        )
      );
    } catch (error) {
      console.error("Hubo un error cambiando el estado del usuario:", error);
    }
  };

  const translateRole = (role) => {
    switch (role) {
      case "player":
        return "Jugadora";
      case "scout":
        return "Reclutador";
      default:
        return role;
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

  return (
    <div className="my-20 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-gray-300">
        <h2 className="my-2 text-center md:text-left">Filtros</h2>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="role-label">Filtrar por rol</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Filtrar por rol"
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value="scout">Reclutadores</MenuItem>
            <MenuItem value="player">Jugadoras</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex-1 p-4">
        <h1 className="text-2xl md:text-4xl font-bold py-2 text-center">
          Lista de Usuarios
        </h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{translateRole(user.role)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={user.state === "active" ? "warning" : "success"}
                      onClick={() => handleChangeState(user.email, user.state)}
                    >
                      {user.state === "active" ? "Desactivar" : "Activar"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(user)}
                      className="mr-5 mb-2 md:mb-0"
                    >
                      Más información
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user.email)}
                      className="mx-8"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Información del Usuario</DialogTitle>
        <DialogContent className="flex flex-col items-center">
          {currentUser.photo && (
            <img
              src={currentUser.photo}
              alt="Foto de perfil"
              className="w-24 h-24 mt-4 rounded-full"
            />
          )}
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            value={currentUser.name || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentUser.email || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Rol"
            type="text"
            fullWidth
            value={translateRole(currentUser.role) || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Tipo de Identificación"
            type="text"
            fullWidth
            value={translateTypeId(currentUser.typeid) || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Número de Identificación"
            type="number"
            fullWidth
            value={currentUser.identification || ""}
            disabled
          />
          {currentUser.license && (
            <div className="mt-4">
              <h3>Licencia del Reclutador:</h3>
              <a
                href={currentUser.license}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver licencia
              </a>
            </div>
          )}
          {currentUser.videos && currentUser.videos.length > 0 && (
            <div className="mt-4">
              <h3>Videos guardados:</h3>
              <ul className="list-disc list-inside">
                {currentUser.videos.map((video, index) => (
                  <li key={index}>
                    <a
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Video {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserList;
