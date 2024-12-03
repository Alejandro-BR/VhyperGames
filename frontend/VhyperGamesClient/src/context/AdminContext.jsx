import { createContext, useState, useEffect } from "react";
import { useAuth } from "./authcontext";
import { getUsersAdmin, updateRol, deleteUser } from "../endpoints/AdminUsers";
import { GET_USERS_ADMIN, UPDATE_USER_ROL, DELETE_USER } from "../config";

// Crear el contexto
export const AdminContext = createContext();

// Proveedor del contexto
export const AdminProvider = ({ children }) => {
  const { token } = useAuth(); 
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsersAdmin(GET_USERS_ADMIN, token);

      if (response.ok) {
        const data = await response.json();
        setUsers(data); 
      } else {
        console.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error en fetchUsers:", error);
    }
  };

  const deleteUserById = async (userId) => {
    try {
      const response = await deleteUser(DELETE_USER, userId, token);

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error en deleteUser:", error);
    }
  };

  const updateUserRole = async (userId) => {
    try {
      const response = await updateRol(UPDATE_USER_ROL, userId, token);

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error al actualizar el rol del usuario");
      }
    } catch (error) {
      console.error("Error en updateUserRole:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token, users]);

  const contextValue = {
    users,
    fetchUsers,
    updateUserRole,
    deleteUserById,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
