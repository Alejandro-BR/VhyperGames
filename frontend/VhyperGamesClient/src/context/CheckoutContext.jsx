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
    
            const cart = getVarLS("cart");
            console.log("Carrito obtenido:", cart);
    
            if (!cart || !cart.items || cart.items.length === 0) {
                setMessage('El carrito está vacío. No se puede crear una reserva.');
                return null; // Retorna null si no hay carrito
            }
    
            const reserveData = {
                modeOfPay,
                cart,
            };
            console.log("Datos de la reserva preparados:", reserveData);
    
            if (!token) {
                updateLocalStorage('reserves', reserveData);
                setMessage('Reserva guardada localmente. Inicia sesión para confirmarla.');
                console.log("Reserva guardada en localStorage:", reserveData);
                return null; // No hay reserveId si no hay token
            } else {
                console.log("Enviando datos al backend...");
                const response = await createReserve(CREATE_RESERVE, reserveData, token);
                console.log("Respuesta del backend (ID de reserva):", response);
    
                if (typeof response === 'number') {
                    setReserveId(response); // Guarda el ID en el contexto
                    setMessage(`Reserva creada exitosamente. ID: ${response}`);
                    return response; // Retorna el ID de la reserva
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
