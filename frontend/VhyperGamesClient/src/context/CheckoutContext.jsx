import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from "./authcontext";
import { getVarLS, updateLocalStorage } from "../utils/keep";
import { CartContext } from './CartContext';
import { getReserve } from '../helpers/reserveHelper';

// Crear el contexto de checkout
export const CheckoutContext = createContext();

// Proveedor del contexto
export const CheckoutProvider = ({ children }) => {

    const { token } = useAuth();
    const { getCartFromDB } = useContext(CartContext);
    const [modeOfPay, setModeOfPay] = useState(0);
    const [message, setMessage] = useState('');

    // Enviamos reserve a la BBDD
    function CreateReserve() {

        const createReserve = async () => {

            try {

                let reserve = getReserve;

                if (!reserve || reserve.length === 0) {
                    reserve = await getCartFromDB();
                }

                // Por si tampoco hay nada en la base de datos
                if (!reserve || reserve.length === 0) {
                    setMessage("No hay nada en el carrito");
                    return;
                }

                const response = await fetch(`${CREATE_RESERVE}?modeOfPay=${modeOfPay}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(reserve)
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessage(data.message);
                } else {
                    const error = await response.json();
                    setMessage(error.message || 'Ocurrió un error.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('Error al conectar con el servidor.');
            }
        };
    }

    // Esto exporta :)
    const contextValue = {
        setModeOfPay,
        CreateReserve
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
