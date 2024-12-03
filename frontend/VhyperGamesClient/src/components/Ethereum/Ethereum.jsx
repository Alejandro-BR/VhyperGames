import { useState, useContext, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { CreateData } from '../../utils/dataCart';
import { CartContext } from '../../context/CartContext';
import { ConvertToDecimal, TotalPrice } from "../../utils/price";
import {
  BLOCKCHAIN_TRANSACTION,
  BLOCKCHAIN_CHECK,
  CONFIRM_RESERVE,
} from "../../config";
export const WALLET_METAMASK = import.meta.env.VITE_WALLET_METAMASK;
import { useAuth } from "../../context/authcontext";
import { CheckoutContext } from "../../context/CheckoutContext";
import Button from "../buttonComponent/Button";

function Ethereum() {
  const [data, setData] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionProcessing, setTransactionProcessing] = useState(false);
  const [transactionEnd, setTransactionEnd] = useState(false);
  const [cartTotalEuros, setCartTotalEuros] = useState(0);
  const [cartTotalEth, setCartTotalEth] = useState(0);
  const [reserveData, setReserveData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const token = useAuth();
  const { reserveId, handleConfirmReserve } = useContext(CheckoutContext);
  const navigate = useNavigate();
  const { gameDetails, items } = useContext(CartContext);

  // Actualiza los datos del carrito
  useEffect(() => {
    const updatedData = CreateData(items, gameDetails);
    setData(updatedData);
  }, [gameDetails, items]);

  // Calcula el total en Euros y ETH
  useEffect(() => {
    if (data.length > 0) {
      const totalEuros = ConvertToDecimal(TotalPrice(data));
      setCartTotalEuros(totalEuros);

      (async () => {
        try {
          const transactionData = await fetchTransactionData(totalEuros);
          if (transactionData) {
            const valueInWei = BigInt(transactionData.value);
            const valueInEth = Number(valueInWei) / 10 ** 18;
            setCartTotalEth(parseFloat(valueInEth));
          }
        } catch (err) {
          console.error("Error al convertir Euros a ETH:", err.message);
          setError(err.message);
        }
      })();
    }
  }, [data]);

  // Conecta la billetera MetaMask
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

  const fetchTransactionData = async (euros) => {
    try {
      const eurosFormatted = parseFloat(euros.toString().replace(",", "."));
      const response = await fetch(BLOCKCHAIN_TRANSACTION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ networkUrl: "https://otter.bordel.wtf/erigon", euros: eurosFormatted }),
      });
  
      const contentType = response.headers.get("Content-Type") || "";
      if (!response.ok) {
        const errorText = await response.text(); // Lee el texto completo para el mensaje de error.
        throw new Error(`Error en la API (${response.status}): ${errorText}`);
      }
  
      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (!data || typeof data.value === "undefined") {
          throw new Error("La API devolvió datos incompletos o inválidos.");
        }
        return data;
      } else {
        const text = await response.text();
        throw new Error(`Respuesta inesperada de la API: ${text}`);
      }
    } catch (err) {
      console.error("Error en fetchTransactionData:", err.message);
      setError(`Error al convertir Euros a Ethereum: ${err.message}`);
      throw err;
    }
  };

  // Manejo del pago
  async function handleComplete() {
    try {
      if (!wallet) {
        throw new Error("Debes conectar tu wallet antes de completar la transacción.");
      }

      setTransactionProcessing(true);

      const transactionData = await fetchTransactionData(cartTotalEuros);
      if (!transactionData || !transactionData.value) {
        throw new Error("Datos de transacción inválidos o incompletos.");
      }

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

      await new Promise(resolve => setTimeout(resolve, 10000));

      const isValid = await verifyTransaction(txHash, wallet, WALLET_METAMASK, transactionData.value);
      if (isValid) {
        const orderId = await handleConfirmReserve(CONFIRM_RESERVE, reserveId);
        setOrderId(orderId);
        setTransactionEnd(true);
        setError(null);
        navigate("/paymentConfirmation", { state: { status: "success", orderId } });
      } else {
        throw new Error("La transacción no es válida.");
      }
    } catch (err) {
      console.error("Error al completar la transacción:", err.message);
      setError(`Error al completar la transacción: ${err.message}`);
    } finally {
      setTransactionProcessing(false);
      setLoading(false);
    }
  }

  // Verifica la transacción
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

      return (await response.text()).trim().toLowerCase() === "true";
    } catch (err) {
      console.error("Error al verificar la transacción:", err.message);
      throw err;
    }
  }


  

  return (
    <div className="App">
      <h1>Pagar con Ethereum</h1>

      <div>
        <p>Total en Euros: {cartTotalEuros}€</p>
        <p>Total en Ethereum: {cartTotalEth.toFixed(6)} ETH</p>
      </div>

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
      {transactionProcessing && <p>Procesando transacción...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {transactionEnd && <p style={{ color: "green" }}>Transacción completada con éxito</p>}
    </div>
  );
}

export default Ethereum;
