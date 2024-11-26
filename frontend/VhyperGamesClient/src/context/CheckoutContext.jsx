import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from "./authcontext";
import { getVarLS, updateLocalStorage } from "../utils/keep";

// Crear el contexto de checkout
export const CheckoutContext = createContext();

// Hook personalizado para consumir el contexto
export const useCheckoutCxt = () => {
    return useContext(CheckoutContext);
};

// Proveedor del contexto
export const CheckoutProvider = ({ children }) => {

    const { token } = useAuth();

    // Usuario no logueado que ha metido cosas en el carrito clicka pagar


    // Creamos variable en Local Storage que guarde la reserva
    const reserve = getVarLS("cart"); // Debe ocurrir antes del login

    // Traemos el token

    // Enviamos reserve a la BBDD
    //CREATE_RESERVE

    function CreateReserve() {
        const [cart, setCart] = useState([]);
        const [modeOfPay, setModeOfPay] = useState(0);
        const [message, setMessage] = useState('');

        const createReserve = async () => {
            try {
                const response = await fetch(CREATE_RESERVE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(cart)
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

        return (
            <div>
                <h1>Crear Reserva</h1>
                <button onClick={createReserve}>Enviar Reserva</button>
                <p>{message}</p>
            </div>
        );
    }

    export default CreateReserve;



    // Llevarlo a login/registro

    // CreateReserve([FromBody] List < CartDto > cart, [FromQuery] PayMode modeOfPay)


    const contextValue = {
        setModeOfPay,
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
