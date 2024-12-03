import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../context/AuthContext";
import { CREATE_PAYMENT_SESSION, CONFIRM_RESERVE, PAYMENT_STATUS } from "../../config";
import { CheckoutContext } from "../../context/CheckoutContext"
import { deleteLocalStorage } from "../../utils/keep";
import { getSessionStripe } from "../../endpoints/ReserveEndpoints";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const token = useAuth();
  const { reserveId, handleConfirmReserve  } = useContext(CheckoutContext);
  const navigate = useNavigate();

  async function createPaymentSession() {

    try {
      const response = await fetch(
        CREATE_PAYMENT_SESSION,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(reserveId),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error al crear la sesión de pago:", error);
      setError(`Error: ${error.message}`);
    }
  }

  useEffect(() => {
    if (token && token.token) {
      createPaymentSession();
    } else {
      setError("No se encontró el token de autenticación.");
    }
  }, [token]);

  useEffect(() => {
    return () => {
      deleteLocalStorage("reserve");
    };
  }, []);

  const handleComplete = async () => {
    try {
      const status = await getSessionStripe (PAYMENT_STATUS, reserveId, token);
      console.log("Pagado o no:", status.paymentStatus)
      if (status.paymentStatus === "paid") {
        const orderId = await handleConfirmReserve(CONFIRM_RESERVE, reserveId);
        navigate("/paymentConfirmation", { state: { status: "success", orderId } });
      } else {
        console.error("Error al completar el pago.");
        navigate("/paymentConfirmation", { state: { status: "failure" } });
      } 
    } catch (err) {
      console.error("Error inesperado al completar el pago:", err);
      navigate("/paymentConfirmation", { state: { status: "failure" } });
    }
  };


  return (
    <>
      {error && <p>{error}</p>}
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret, onComplete: handleComplete }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </>
  );
}

export default CheckoutForm;
