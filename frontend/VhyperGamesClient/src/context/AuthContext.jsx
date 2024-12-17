import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { getVarLS, getVarSessionStorage, updateLocalStorage, updateSessionStorage, deleteLocalStorage, deleteSessionStorage } from "../utils/keep.js";
import { jwtDecode } from 'jwt-decode'; 


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
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (decodedToken) {
            const currentTime = Math.floor(Date.now() / 1000);
            let expirationTime = (decodedToken?.exp - currentTime)*1000;
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



    // Cargar el token
    useEffect(() => {
        const storedToken = getVarLS('accessToken') || getVarSessionStorage('accessToken');
        if (storedToken) {
            setToken(storedToken);
            setDecodedToken(jwtDecode(storedToken));
        }
    }, []);


    // Función para almacenar el token
    const saveToken = (newToken, rememberSession) => {
        if (rememberSession) {
            updateLocalStorage(newToken, 'accessToken');
        } else {
            updateSessionStorage(newToken, "accessToken");
        }

        setToken(newToken);
        setDecodedToken(jwtDecode(newToken));
        setIsLoggedIn(true);
    };

    

    // Función para eliminar el token
    const logout = () => {
        stopInactivityTimer()
        deleteLocalStorage('accessToken');
        deleteSessionStorage('accessToken');
        deleteLocalStorage('reserve');
        setToken(null);
        setDecodedToken(null);
        setIsLoggedIn(false);
        window.location.href = "/";
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
        isLoggedIn,
        logout,
    };



    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
