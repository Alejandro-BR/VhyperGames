import { createContext, useState, useContext } from "react";
import { useAuth } from "./authcontext";
import { CartContext } from "./CartContext";
import { createReserve, getReserveDetails } from "../helpers/reserveHelper";
import { getVarLS, updateLocalStorage } from "../utils/keep";

import { CREATE_RESERVE, GET_RESERVE_DETAILS } from "../config";

// Crear el contexto de checkout
export const CheckoutContext = createContext();

// Proveedor del contexto
export const CheckoutProvider = ({ children }) => {
  const { token } = useAuth();
  const { getCartFromDB } = useContext(CartContext);
  const [modeOfPay, setModeOfPay] = useState(0);
  const [reserveId, setReserveId] = useState(null);
  const [message, setMessage] = useState("");

  let reserve;

  const handleCreateReserve = async (modeOfPay, useLocalReserve = false) => {
    try {
      if (useLocalReserve) {
        reserve = getVarLS("reserve");
      } else {
        const cart = getVarLS("cart");
        if (!cart || !cart.items || cart.items.length === 0) {
          setMessage("El carrito está vacío. No se puede crear una reserva.");
          return null; // Salir si el carrito está vacío
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

  const fetchReserveDetails = async () => {
    try {
      const reserveDetails = await getReserveDetails(
        GET_RESERVE_DETAILS,
        reserveId,
        token
      );
      console.log("Detalles de la reserva:", reserveDetails);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Esto exporta :)
  const contextValue = {
    setModeOfPay,
    handleCreateReserve,
    reserve,
    message,
    reserveId,
    fetchReserveDetails,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};
