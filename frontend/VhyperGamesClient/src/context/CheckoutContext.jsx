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
    const [message, setMessage] = useState('');

    const handleCreateReserve = async (modeOfPay) => {
        try {

            // Obtener el carrito desde el contexto de Cart
            const cart = getVarLS("cart");
            console.log("Carrito obtenido:", cart);

            if (!cart || cart.length === 0) {
                setMessage('El carrito está vacío. No se puede crear una reserva.');
                console.log("El carrito está vacío. Fin del proceso.");
                return;
            }

            const reserveData = {
                modeOfPay,
                cart,
            };

            if (!token) {
                // Usuario no logueado: guardar en localStorage
                updateLocalStorage('reserves', reserveData);
                setMessage('Reserva guardada localmente. Inicia sesión para confirmarla.');
                console.log("Reserva guardada en localStorage:", reserveData);
            } else {
                // Usuario logueado: enviar al backend
                console.log("Enviando datos al backend...");
                const response = await createReserve(CREATE_RESERVE, reserveData, token);
                console.log("Respuesta del backend:", response);

                if (response.success) {
                    setMessage('Reserva creada exitosamente.');
                    console.log("Reserva creada exitosamente.");
                } else {
                    throw new Error(response.message || 'Error desconocido al crear la reserva.');
                }
            }
        } catch (error) {
            console.error("Error al crear la reserva:", error);
            setMessage(`Error: ${error.message}`);
        }
    };

    // Esto exporta :)
    const contextValue = {
        setModeOfPay,
        handleCreateReserve,
        message,
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
