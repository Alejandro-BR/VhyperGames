import { useState, useContext, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { CreateData } from "../../utils/dataCart";
import { CartContext } from "../../context/CartContext";
import { ConvertToDecimal, TotalPrice } from "../../utils/price";
import {
  BLOCKCHAIN_TRANSACTION,
  BLOCKCHAIN_CHECK,
  CONFIRM_RESERVE,
  BLOCKCHAIN_TOTAL_RESERVE
} from "../../config";
export const WALLET_METAMASK = import.meta.env.VITE_WALLET_METAMASK;
import { useAuth } from "../../context/AuthContext";
import { CheckoutContext } from "../../context/CheckoutContext";
import Button from "../Buttons/Button";
import { fetchReserveTotal } from "../../helpers/ethereumHelper";





function Ethereum() {
  const [data, setData] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionProcessing, setTransactionProcessing] = useState(false);
  const [transactionEnd, setTransactionEnd] = useState(false);
  const [cartTotalEuros, setCartTotalEuros] = useState(0);
  const [cartTotalEth, setCartTotalEth] = useState(0);
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
// Calcula el total en Euros y ETH
useEffect(() => {
  const calculateTotal = async () => {
    try {
      const storedReserve = localStorage.getItem("reserve");

      if (storedReserve && reserveId) {

        // Llama al endpoint para obtener el total de la reserva
        const reserveData = await fetchReserveTotal(BLOCKCHAIN_TOTAL_RESERVE, reserveId, token);
        const totalEurosFormatted = ConvertToDecimal(reserveData.total);
        setCartTotalEuros(totalEurosFormatted);

        const transactionData = await fetchTransactionData(totalEurosFormatted); //El endpoint recibe 00.00
        if (transactionData) {
          const valueInWei = BigInt(transactionData.value);
          const valueInEth = Number(valueInWei) / 10 ** 18;
          setCartTotalEth(parseFloat(valueInEth));
        }
      } else {
        console.log("No se detectó reserva. Calculando el total del carrito...");

        // Calcula el total del carrito en centavos
        const totalEurosCent = TotalPrice(data);
        const totalEurosFormatted = ConvertToDecimal(totalEurosCent);
        setCartTotalEuros(totalEurosFormatted);

        // Endpoint ethereum 
        const transactionData = await fetchTransactionData(totalEurosFormatted);
        if (transactionData) {
          const valueInWei = BigInt(transactionData.value);
          const valueInEth = Number(valueInWei) / 10 ** 18;
          setCartTotalEth(parseFloat(valueInEth));
        }
      }
    } catch (err) {
      console.error("Error al calcular el total:", err.message);
      setError(err.message);
    }
  };

  if (data.length > 0 || localStorage.getItem("reserve")) {
    calculateTotal();
  }
}, [data, token, reserveId]);


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

  

  // Pago completo
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

      //await new Promise((resolve) => setTimeout(resolve, 10000));

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

  // ENDPOINT_BLOCKCHAIN_TRANSACTION
  const fetchTransactionData = async (euros) => {
    try {
      const eurosFormatted = parseFloat(euros.toString().replace(",", "."));
      const response = await fetch(BLOCKCHAIN_TRANSACTION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          networkUrl: "https://otter.bordel.wtf/erigon",
          euros: eurosFormatted,
        }),
      });

      const contentType = response.headers.get("Content-Type") || "";
      if (!response.ok) {
        const errorText = await response.text();
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

  // ENDPOINT_BLOCKCHAIN_CHECK
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
          <Button variant="short" color="azul" onClick={conectandoWallet} disabled={!!wallet}>
            {wallet ? "Wallet conectada" : "Conectar MetaMask"}
          </Button>
          <Button variant="short" color="morado" onClick={handleComplete} disabled={!wallet}>
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
