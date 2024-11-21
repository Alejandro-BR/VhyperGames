// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect, useRef } from 'react';
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
    const inactivityTimer = useRef(null); 
    const inactivityTimeLimit = useRef(null);

    useEffect(() => {
        if (decodedToken) {
            const currentTime = Math.floor(Date.now() / 1000);
            
            let expirationTime = decodedToken?.exp - currentTime;
            expirationTime = 5000
            inactivityTimeLimit.current = expirationTime;
            startInactivityTimer();

            return () => stopInactivityTimer();
        }
    }, [decodedToken]);
    const startInactivityTimer = () => {
        resetInactivityTimer();
        window.addEventListener('mousemove', resetInactivityTimer);
        window.addEventListener('keydown', resetInactivityTimer);
        window.addEventListener('scroll', resetInactivityTimer);
    };

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            logout(); 
        }, inactivityTimeLimit.current);
    };
    
    const stopInactivityTimer = () => {
        clearTimeout(inactivityTimer.current);
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keydown', resetInactivityTimer);
        window.removeEventListener('scroll', resetInactivityTimer);
    };

    



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
        console.log("saveToken")
        updateSessionStorage(newToken, 'accessToken');
        setToken(newToken);
        setDecodedToken(jwtDecode(newToken));
    };

    // Función para eliminar el token
    const logout = () => {
        stopInactivityTimer()
        deleteSessionStorage('accessToken');
        setToken(null);
        setDecodedToken(null);
    };

    const username = decodedToken?.name || null;
    const userId = decodedToken?.id || null;
    const timer = decodedToken?.exp || null;


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
