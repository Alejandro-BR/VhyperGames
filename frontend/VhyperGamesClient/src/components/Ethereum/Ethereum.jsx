import { useState, useContext, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../context/CheckoutContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../Buttons/Button";
import { BLOCKCHAIN_TRANSACTION, CONFIRM_RESERVE, BLOCKCHAIN_CHECK } from "../../config";

export const WALLET_METAMASK = import.meta.env.VITE_WALLET_METAMASK;

function Ethereum() {
  const [wallet, setWallet] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionProcessing, setTransactionProcessing] = useState(false);
  const [transactionEnd, setTransactionEnd] = useState(false);
  const [error, setError] = useState(null);

  const token = useAuth(); 
  const { reserveId, handleConfirmReserve } = useContext(CheckoutContext);
  const navigate = useNavigate();

  //Conecta Wallet
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

  // ENDPOINT_TRANSACTION
  const fetchTransactionData = async () => {
    try {
      setLoading(true);

      if (!token) {
        throw new Error("No se encontró un token válido. Por favor, inicia sesión nuevamente.");
      }

      const response = await fetch(BLOCKCHAIN_TRANSACTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify({
          reserveId: reserveId,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la API (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      setTransactionData(data);
    } catch (err) {
      console.error("Error al obtener datos de transacción:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    // ENDPOINT_CHECK
  const verifyTransaction = async (txHash) => {
    try {
      const response = await fetch(BLOCKCHAIN_CHECK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify({
          hash: txHash,
          from: wallet,
          to: WALLET_METAMASK,
          value: transactionData.value,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API (${response.status}): ${await response.text()}`);
      }

      const isValid = await response.json();
      console.log("IS VALIDO COÑO", isValid)
      return isValid;
    } catch (err) {
      console.error("Error al verificar la transacción:", err.message);
      setError(err.message);
      return false;
    }
  };

  //Pago completo
  async function handleComplete() {
    try {
      if (!wallet) {
        throw new Error("Debes conectar tu wallet antes de completar la transacción.");
      }

      if (!transactionData) {
        throw new Error("Los datos de la transacción no están disponibles.");
      }

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

      // Verificar la transacción
      const isValid = await verifyTransaction(txHash);
      if (isValid) {
        console.log("La transacción es válida.");
        const orderId = await handleConfirmReserve(CONFIRM_RESERVE, reserveId);
        setTransactionEnd(true);
        navigate("/paymentConfirmation", { state: { status: "success", orderId } });
      } else {
        throw new Error("La transacción no es válida.");
      }
    } catch (err) {
      console.error("Error al completar la transacción:", err.message);
      setError(`Error al completar la transacción: ${err.message}`);
    } finally {
      setTransactionProcessing(false);
    }
  }

  //Si reserveId cambia, llama wallet
  useEffect(() => {
    if (reserveId) {
      fetchTransactionData();
    }
  }, [reserveId]);

  return (
    <div className="App">
      <h1>Pagar con Ethereum</h1>

      {transactionData && (
        <div>
          <p>Total en Euros: {transactionData.totalEuros}€</p>
          <p>Total en Ethereum: {transactionData.equivalentEthereum} ETH</p>
        </div>
      )}

      {!loading && (
        <div>
          <Button variant="short" color="azul" onClick={conectandoWallet} disabled={!!wallet}>
            {wallet ? "Wallet conectada" : "Conectar MetaMask"}
          </Button>
          <Button variant="short" color="morado" onClick={handleComplete} disabled={!wallet || !transactionData}>
            Confirmar Pago
          </Button>
        </div>
      )}

      {loading && <p>Procesando...</p>}
      {transactionProcessing && <p>Procesando transacción...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transactionEnd && <p style={{ color: "green" }}>Transacción completada con éxito</p>}
    </div>
  );
}

export default Ethereum;
