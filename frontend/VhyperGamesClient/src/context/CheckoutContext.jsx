import { createContext, useState, useContext } from 'react';
import { useAuth } from "./authcontext";
import { CartContext } from './CartContext';
import { createReserve } from '../helpers/reserveHelper';
import { getVarLS, updateLocalStorage } from '../utils/keep';

import { CREATE_RESERVE } from '../config';

// Crear el contexto de checkout
export const CheckoutContext = createContext();

// Proveedor del contexto
export const CheckoutProvider = ({ children }) => {
    const { token } = useAuth();
    const { getCartFromDB } = useContext(CartContext);
    const [modeOfPay, setModeOfPay] = useState(0);
    const [reserveId, setReserveId] = useState(null);
    const [message, setMessage] = useState('');

    const handleCreateReserve = async (modeOfPay, useLocalReserve = false) => {
    try {
        console.log("Inicio del proceso de creación de reserva");

        let reserve;

        // Decide si usar la reserva del localStorage o los datos del carrito
        if (useLocalReserve) {
            console.log("Intentando usar la reserva desde localStorage...");
            reserve = getVarLS("reserve");
            
        } else {
            console.log("Intentando usar los datos del carrito...");
            const cart = getVarLS("cart");
            if (!cart || !cart.items || cart.items.length === 0) {
                setMessage('El carrito está vacío. No se puede crear una reserva.');
                return null; // Salir si el carrito está vacío
            }
            reserve = { ...cart };
        }

        // Validar si la reserva tiene datos válidos
        if (!reserve || !reserve.items || reserve.items.length === 0) {
            setMessage('No se encontró una reserva válida.');
            console.error("No se encontró una reserva válida.", reserve);
            return null;
        }

        console.log("Reserva seleccionada:", reserve);

        const reserveData = {
            modeOfPay,
            reserve,
        };

        console.log("Datos de la reserva preparados:", reserveData);

        // Si no hay token, guardar reserva localmente y salir
        if (!token) {
            console.log("Usuario no autenticado. Reserva guardada en localStorage:", reserveData);
            return null;
        }

        // Enviar la reserva al backend
        console.log("Enviando datos al backend...");
        const response = await createReserve(CREATE_RESERVE, reserveData, token);
        console.log("Respuesta del backend (ID de reserva):", response);

        if (typeof response === 'number') {
            setReserveId(response); // Guardar el ID en el contexto
            setMessage(`Reserva creada exitosamente. ID: ${response}`);
            return response; // Retornar el ID de la reserva
        } else {
            throw new Error('Respuesta inesperada del backend.');
        }
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        setMessage(`Error: ${error.message}`);
        throw error;
    }
};
    

    // Esto exporta :)
    const contextValue = {
        setModeOfPay,
        handleCreateReserve,
        message,
        reserveId,
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
