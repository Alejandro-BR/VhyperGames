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

    const handleCreateReserve = async (modeOfPay) => {
        try {
            console.log("Inicio del proceso de creación de reserva");
    
            // Comprobar primero si existe reserve
            let reserve = getVarLS("reserve");
    
            // Si no existe reserve, comprobar carrito
            if (!reserve || !reserve.items || reserve.items.length === 0) {
                console.log("No se encontró reserve, comprobando carrito...");
                const cart = getVarLS("cart");
    
                if (!cart || !cart.items || cart.items.length === 0) {
                    setMessage('El carrito está vacío. No se puede crear una reserva.');
                    return null; // Salir si tampoco hay carrito
                }
    
                // Usar carrito como reserva
                reserve = { ...cart };
                console.log("Usando carrito como reserva:", reserve);
            }
    
            const reserveData = {
                modeOfPay,
                reserve,
            };
    
            console.log("Datos de la reserva preparados:", reserveData);
    
            if (!token) {
                console.log("Usuario no autenticado. Reserva guardada en localStorage:", reserveData);
                return null; // Salir si no hay token
            } else {
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
