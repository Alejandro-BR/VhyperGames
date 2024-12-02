import { useState, useContext, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import {
  BLOCKCHAIN_TRANSACTION,
  BLOCKCHAIN_CHECK,
  CREATE_PAYMENT_SESSION,
  CONFIRM_RESERVE,
} from "../../config";
export const WALLET_METAMASK = import.meta.env.VITE_WALLET_METAMASK;
import { useAuth } from "../../context/authcontext";
import { CheckoutContext } from "../../context/CheckoutContext";
import Button from "../buttonComponent/Button";

function Ethereum() {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionProcessing, setTransactionProcessing] = useState(false);
  const [transactionEnd, setTransactionEnd] = useState(false);
  const [cartTotalEuros, setCartTotalEuros] = useState(0);
  const [cartTotalEth, setCartTotalEth] = useState(0);
  const token = useAuth();
  const { reserveId, handleConfirmReserve } = useContext(CheckoutContext);
  const navigate = useNavigate(); 

  async function createPaymentSession() {
    try {
      setLoading(true);
      const response = await fetch(CREATE_PAYMENT_SESSION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(reserveId),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setCartTotalEuros(data.totalEuros);
      setCartTotalEth(data.totalEth);
      setError(null);
    } catch (err) {
      setError(`Error al crear la sesión de pago: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function conectandoWallet() {
    try {
      if (!window.ethereum?.isMetaMask) {
        throw new Error("MetaMask no está instalado en tu navegador.");
      }

      setLoading(true);
      const web3Instance = new Web3(window.ethereum);
      const accounts = await web3Instance.eth.requestAccounts();

      if (accounts.length === 0) {
        throw new Error("No tienes ninguna cuenta activa en MetaMask.");
      }

      setWallet(accounts[0]);
      setError(null);
    } catch (err) {
      setError(`Error al conectar MetaMask: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete() {
    try {
      if (!wallet) {
        throw new Error("Debes conectar tu wallet antes de completar la transacción.");
      }

      const transactionData = await fetchTransactionData(cartTotalEuros);

      setTransactionProcessing(true);
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: wallet,
            to: WALLET_METAMASK,
            value: transactionData.value,
            gas: transactionData.gas,
            gasPrice: transactionData.gasPrice,
          },
        ],
      });

      console.log("Transacción enviada, hash:", txHash);

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const isValid = await verifyTransaction(txHash, wallet, WALLET_METAMASK, transactionData.value);

      if (isValid) {
        console.log("Transacción validada. Confirmando reserva...");
        const orderId = await handleConfirmReserve(CONFIRM_RESERVE, reserveId);
        console.log("Reserva confirmada con ID:", orderId);

        setTransactionEnd(true);
        setError(null);

        navigate("/paymentConfirmation", { state: { status: "success", orderId } });
      } else {
        throw new Error("La transacción no es válida.");
      }
    } catch (err) {
      setError(`Error al completar la transacción: ${err.message}`);
    } finally {
      setTransactionProcessing(false);
      setLoading(false);
    }
  }

  async function fetchTransactionData(euros) {
    try {
      const response = await fetch(BLOCKCHAIN_TRANSACTION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ networkUrl: "https://otter.bordel.wtf/erigon", euros }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de la transacción.");
      }

      return await response.json();
    } catch (err) {
      throw new Error(`Error al obtener los datos de la transacción: ${err.message}`);
    }
  }

  async function verifyTransaction(txHash, from, to, value) {
    try {
      const response = await fetch(BLOCKCHAIN_CHECK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          networkUrl: "https://otter.bordel.wtf/erigon",
          hash: txHash,
          from,
          to,
          value,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al verificar la transacción.");
      }

      const isValid = (await response.text()).trim().toLowerCase() === "true";
      return isValid;
    } catch (err) {
      throw new Error(`Error al verificar la transacción: ${err.message}`);
    }
  }

  useEffect(() => {
    if (token && token.token) {
      createPaymentSession();
    } else {
      setError("No se encontró el token de autenticación.");
    }
  }, [token]);

  return (
    <div className="App">
      <h1>Pagar con Ethereum</h1>

      {cartTotalEuros > 0 && (
        <>
          <p>Total en Euros: {cartTotalEuros}€</p>
          <p>Total en Ethereum: {cartTotalEth} ETH</p>
        </>
      )}

      {!loading && (
        <div>
          <Button
            variant="short"
            color="azul"
            onClick={conectandoWallet}
            disabled={!!wallet}
          >
            {wallet ? "Wallet conectada" : "Conectar MetaMask"}
          </Button>
          <Button
            variant="short"
            color="morado"
            onClick={handleComplete}
            disabled={!wallet}
          >
            Confirmar Pago
          </Button>
        </div>
      )}

      {loading && <p>Procesando...</p>}

      {transactionProcessing && (
        <div>
          <p>Procesando transacción...</p>
          <div id="logo-container"></div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {transactionEnd && (
        <p style={{ color: "green" }}>Transacción completada con éxito</p>
      )}
    </div>
  );
}

export default Ethereum;
