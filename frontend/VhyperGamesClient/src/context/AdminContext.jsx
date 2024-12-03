import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUsersAdmin, updateRol, deleteUser } from "../endpoints/AdminUsers";
import { getGamesAdmin, updateGames, newGame, searchGame, getFormGame } from "../endpoints/AdminGames";
import { GET_USERS_ADMIN, UPDATE_USER_ROL, DELETE_USER, GET_GAMES_ADMIN, UPDATE_GAME, NEW_GAME, GET_FORM_GAME, GET_SEARCH_GAMES_ADMIN } from "../config";

// Crear el contexto
export const AdminContext = createContext();

// Proveedor del contexto
export const AdminProvider = ({ children }) => {
  const { token, decodedToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [dataForm, setDataForm] = useState([]);
  
  // ----- ADMIN USER -----

  const fetchUsers = async () => {
    try {
      const response = await getUsersAdmin(GET_USERS_ADMIN, token);

      if (response.ok) {
        setUsers(response);
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

  // ----- ADMIN GAME -----

  const fetchGames = async () => {
  
    try {
      const response = await getGamesAdmin(GET_GAMES_ADMIN, token);
  
      if (response.ok) {
        setGames(response);
      } 
    } catch (error) {
      console.error("Error en fetchGames:", error);
    }
  };
  

  const updateGameById = async (data) => {
    try {
      const response = await updateGames(UPDATE_GAME, data, token);
      if (response.ok) {
        fetchGames();
        setDataForm([]);
      } else {
        console.error("Error al actualizar el juego");
      }
    } catch (error) {
      console.error("Error en updateGameById:", error);
    }
  };

  const postGame = async (data) => {
    try {
      const response = await newGame(NEW_GAME, data, token);
      if (response.ok) {
        fetchGames();
      } else {
        console.error("Error al crear el juego");
      }
    } catch (error) {
      console.error("Error en postGame:", error);
    }
  };

  const GetSearchGame = async (data) => {
    try {
      const response = await searchGame(GET_SEARCH_GAMES_ADMIN, data, token);
      if (response.ok) {
        setGames(response);
      } else {
        console.error("Error al buscar el juego");
      }
    } catch (error) {
      console.error("Error en GetSearchGame:", error);
    }
  };

  const GetFormGame = async (gameId) => {
    try {
      const response = await getFormGame(GET_FORM_GAME, gameId, token);
      if (response.ok) {
        setDataForm(response);
        fetchGames();
      } else {
        console.error("Error al pedir el formulario el juego");
      }
    } catch (error) {
      console.error("Error en GetFormGame:", error);
    }
  };

  const ResetSearchGame = async () => {
    await fetchGames();
  }

  // ----- useEffect -----

  useEffect(() => {
    if (token && decodedToken?.Role === "Admin") {
      fetchUsers();
      fetchGames();
    }
  }, [token, decodedToken]);

  const contextValue = {
    users,
    games,
    dataForm,
    fetchUsers,
    updateUserRole,
    deleteUserById,
    fetchGames,
    updateGameById,
    postGame,
    GetSearchGame,
    GetFormGame,
    ResetSearchGame
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
