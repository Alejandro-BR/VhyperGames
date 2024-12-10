import { useState, useContext, useEffect, useRef } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../context/CheckoutContext";
import { useAuth } from "../../context/AuthContext";
import { CONFIRM_RESERVE } from "../../config";
import { fetchTransactionData, verifyTransaction } from "../../endpoints/EthereumEndpoints";
import MetaMaskLogo from "@metamask/logo"; 
import classes from "./Ethereum.module.css";
import Button from "../Buttons/Button";
import { updateLocalStorage } from "../../utils/keep";

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
  const logoRef = useRef(null);

  // Logo de MetaMask
  useEffect(() => {
    const viewer = MetaMaskLogo({
      pxNotRatio: true,
      width: 100,
      height: 100,
      followMouse: true,
      slowDrift: true,
    });

    if (logoRef.current) {
      logoRef.current.appendChild(viewer.container);
    }
    return () => {
      viewer.stopAnimation();
    };
  }, []);

  // Obtener datos de transacción cuando reserveId cambie
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        if (reserveId && token) {
          setLoading(true);
          const data = await fetchTransactionData(reserveId, token.token);
          setTransactionData(data);

          if (data?.equivalentEthereum) {
            updateLocalStorage(data.equivalentEthereum, "equivalentEthereum");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [reserveId, token]);

  // Flujo completo
  async function handleComplete() {
    try {
      if (!window.ethereum?.isMetaMask) {
        setError("MetaMask no está instalado en tu navegador. Redirigiendo al carrito...");
        setTimeout(() => navigate("/cart"), 3000); 
      return;
      }

      setLoading(true);

      // Conectar la wallet
      const web3Instance = new Web3(window.ethereum);
      const accounts = await web3Instance.eth.requestAccounts();

      if (accounts.length === 0) {
        setError("No tienes cuenta en Metamask. Redirigiendo al carrito...");
        setTimeout(() => navigate("/cart"), 3000); 
      return;
      }

      const connectedWallet = accounts[0];
      setWallet(connectedWallet);

      if (!transactionData) {
        setError("Datos de transacción no disponibles. Redirigiendo al carrito...");
        setTimeout(() => navigate("/cart"), 3000); 
      return;
      }

      // Realizar la transacción
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedWallet,
            to: transactionData.to,
            value: transactionData.value,
            gas: transactionData.gas,
            gasPrice: transactionData.gasPrice,
          },
        ],
      });

      // Verificar la transacción
      const isValid = await verifyTransaction(txHash, connectedWallet, transactionData, token.token);
      if (isValid) {
        const orderId = await handleConfirmReserve(CONFIRM_RESERVE, reserveId);
        setTransactionEnd(true);
        navigate("/paymentConfirmation", { state: { status: "success", orderId } });
      } else {
        throw new Error("La transacción no es válida.");
      }
    } catch (err) {
      setError("Ha ocurrido un error en el proceso de pago. Redirigiendo al carrito...");
      setTimeout(() => navigate("/cart"), 3000); 
      return;
    } finally {
      setLoading(false);
      setTransactionProcessing(false);
    }
  }

  return (
    <div className={classes.paymentContainer}>
      <h1>Pagar con Ethereum</h1>

      <div className={classes.logoContainer} ref={logoRef}></div>

      {transactionData ? (
        <div className={classes.transactionInfo}>
          <p>{transactionData.totalEuros.toFixed(2).replace(".", ",")} €</p>


          <p>{transactionData.equivalentEthereum} ETH
            <img src="/icon/ethereum.svg" className={classes.ethereumLogo}></img>
          </p>
        </div>
      ) : (
        <p className={classes.transactionInfo}>Obteniendo datos de la transacción...</p>
      )}
      <div className={classes.buttonPayment}>
        <Button
          variant="large"
          color="morado"
          onClick={handleComplete}
          disabled={loading || transactionProcessing}
        >
          {loading || transactionProcessing ? "Procesando..." : "Iniciar Pago"}
        </Button>
      </div>
      {error && <p className={classes.errorMessage}>{error}</p>}
      {transactionEnd && <p className={classes.successMessage}>Transacción completada con éxito</p>}
    </div>
  );
}

export default Ethereum;
