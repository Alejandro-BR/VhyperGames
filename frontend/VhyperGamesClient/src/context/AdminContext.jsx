import { createContext, useState, useEffect } from "react";
import { useAuth } from "./authcontext";

// Crear el contexto
export const AdminContext = createContext();

// Proveedor del contexto
export const AdminProvider = ({ children }) => {
  const { token } = useAuth(); 
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = null; //Peticion

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

  // Función para eliminar un usuario (DELETE)
  const deleteUser = async (userId) => {
    try {
      const response = null; //Peticion

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error en deleteUser:", error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = null; // Peticion

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
  }, [token]);

  const contextValue = {
    users,
    fetchUsers,
    updateUserRole,
    deleteUser,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
