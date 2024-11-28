import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../context/authcontext";
import { CREATE_PAYMENT_SESSION, CONFIRM_RESERVE } from "../../config";
import { CheckoutContext } from "../../context/CheckoutContext"
import { deleteLocalStorage } from "../../utils/keep";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const token = useAuth();
  const { reserveId, handleConfirmReserve } = useContext(CheckoutContext);
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
      console.log("Esta es la id de la reserva", reserveId)
      const orderId = await handleConfirmReserve(CONFIRM_RESERVE, reserveId);
      console.log("Esta es la ID de la orden:", orderId)
      if (orderId === -1) {
        navigate("/paymentConfirmation", { state: { status: "failure" } });

      } else {
        navigate("/paymentConfirmation", { state: { status: "success", orderId } });
      }

    } catch (error) {
      console.error("Error al completar el pago:", error);
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
