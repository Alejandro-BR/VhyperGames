import { createContext, useState } from "react";
import { useAuth } from "./authcontext";
import { createReserve, getReserveDetails, confirmReserve } from "../helpers/reserveHelper";
import { getVarLS, updateLocalStorage } from "../utils/keep";

import { CREATE_RESERVE } from "../config";

// Crear el contexto de checkout
export const CheckoutContext = createContext();

// Proveedor del contexto
export const CheckoutProvider = ({ children }) => {
  const { token } = useAuth();
  const [modeOfPay, setModeOfPay] = useState(0);
  const [reserve, setReserve] = useState([]);
  const [reserveId, setReserveId] = useState(null);
  const [message, setMessage] = useState("");

  

  const handleCreateReserve = async (modeOfPay, useLocalReserve = false) => {
    try {
      let reserve;

      if (useLocalReserve) {
        reserve = getVarLS("reserve");
      } else {
        const cart = getVarLS("cart");
        if (!cart || !cart.items || cart.items.length === 0) {
          setMessage("El carrito está vacío. No se puede crear una reserva.");
          return null;
        }
        reserve = { ...cart };
      }

      if (!reserve || !reserve.items || reserve.items.length === 0) {
        setMessage("No se encontró una reserva válida.");
        console.error("No se encontró una reserva válida.", reserve);
        return null;
      }

      const reserveData = {
        modeOfPay,
        reserve,
      };

      if (!token) {
        return null;
      }

      const response = await createReserve(CREATE_RESERVE, reserveData, token);

      if (typeof response === "number") {
        setReserveId(response);
        return response;
      } else {
        throw new Error("Respuesta inesperada del backend.");
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      setMessage(`Error: ${error.message}`);
      throw error;
    }
  };

  const loadReserveDetails = async (url, reserveId) => {
    if (!token) {
      console.error("No se puede cargar la reserva: Token de autenticación no disponible.");
      return { items: [] };
    }
  
    try {
      const data = await getReserveDetails(url, reserveId, token);
  
      if (JSON.stringify(data) !== JSON.stringify(reserve)) {
        setReserve(data);
      }
  
      return data;
    } catch (error) {
      console.error("Error al cargar los detalles de la reserva:", error.message);
      setReserve({ items: [] }); 
      throw error;
    }
  };
  
  const handleConfirmReserve = async (url, reserveId) => {
    if (!token) {
      console.error("No se puede cargar la reserva: Token de autenticación no disponible.");
      return;
    }

    try {
      const data = await confirmReserve(url, reserveId, token);
      return data;
    } catch (error) {
      console.error("Error al confirmar la reserva:", error.message);
    }
  };

  const contextValue = {
    setModeOfPay,
    handleCreateReserve,
    reserve,
    message,
    reserveId,
    setReserveId,
    loadReserveDetails,
    handleConfirmReserve
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};
