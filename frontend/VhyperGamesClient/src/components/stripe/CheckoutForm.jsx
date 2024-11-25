import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useAuth } from "../../context/authcontext";
import { CREATE_PAYMENT_SESSION } from "../../config";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const token = useAuth();

  async function createPaymentSession() {
    try {
      console.log("Token enviado:", token.token);

      const response = await fetch(
        CREATE_PAYMENT_SESSION,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
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

  const handleComplete = () => {
    //aquí aviso al server que el pago se ha completado
    console.log("Payment completed!");
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
