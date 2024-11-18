// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { getVarSessionStorage, updateSessionStorage, deleteSessionStorage } from "../utils/keep.js";
import { jwtDecode } from 'jwt-decode'; // Importación corregida

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);

    // Cargar el token desde sessionStorage al inicio
    useEffect(() => {
        const storedToken = getVarSessionStorage('accessToken');
        if (storedToken) {
            setToken(storedToken);
            setDecodedToken(jwtDecode(storedToken));
        }
    }, []);

    // Función para almacenar el token
    const saveToken = (newToken) => {
        updateSessionStorage(newToken, 'accessToken');
        setToken(newToken);
        setDecodedToken(jwtDecode(newToken));
    };

    // Función para eliminar el token
    const logout = () => {
        deleteSessionStorage('accessToken');
        setToken(null);
        setDecodedToken(null);
    };

    const username = decodedToken?.name || null;
    const userId = decodedToken?.id || null;

    const contextValue = {
        token,
        decodedToken,
        username,
        userId,
        saveToken,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
