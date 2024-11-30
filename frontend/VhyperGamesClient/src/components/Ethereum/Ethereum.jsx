import { useState } from "react";
import Web3 from "web3";
import { BLOCKCHAIN_TRANSACTION, BLOCKCHAIN_CHECK } from "../../config";
export const WALLET_METAMASK = import.meta.env.VITE_WALLET_METAMASK;

function Ethereum() {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionEnd, setTransactionEnd] = useState(false);

  const total = 10; 

  async function conectandoWallet() {
    try {
      console.log("Conectando a MetaMask...");
      if (!window.ethereum?.isMetaMask) {
        setError("MetaMask no está instalado en tu navegador.");
        return;
      }

      setError(null);
      setLoading(true);

      const web3Instance = new Web3(window.ethereum);
      const accounts = await web3Instance.eth.requestAccounts();

      if (accounts.length === 0) {
        setError("No tienes ninguna cuenta activa en MetaMask.");
        return;
      }

      const account = accounts[0];
      setWallet(account);
      console.log("Wallet conectada:", account);

      // Solicitar datos de la transacción al backend
      const transactionData = await fetchTransactionData(total);
      console.log("Datos de transacción recibidos:", transactionData);

      // Crear y enviar la transacción desde MetaMask
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: WALLET_METAMASK, 
            value: transactionData.value, 
            gas: transactionData.gas,
            gasPrice: transactionData.gasPrice,
          },
        ],
      });

      console.log("Hash de la transacción:", txHash);

      // Verificar la transacción en el backend

await new Promise((resolve) => setTimeout(resolve, 10000));

const isValid = await verifyTransaction(
  txHash,
  account,
  WALLET_METAMASK, 
  transactionData.value
);  //0xbe143897B70f343EeAc5D50BEe1A0e2708c6Ff07
// 0xB57B61DB1E978158A0c18951687318C1CC19fB54
console.log("FROM",account)
console.log(isValid);
      if (isValid) {
        setTransactionEnd(true);
        setError(null);
        console.log("Transacción validada exitosamente.");
      } else {
        throw new Error("La transacción no es válida.");
      }
    } catch (error) {
      console.error("Error al procesar la transacción:", error);
      setError("Error al procesar la transacción. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTransactionData(euros) {
    try {
      const response = await fetch(BLOCKCHAIN_TRANSACTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          networkUrl: "https://otter.bordel.wtf/erigon", 
          euros: total,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de la transacción.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en fetchTransactionData:", error);
      throw error;
    }
  }

  async function verifyTransaction(txHash, from, to, value) {
    try {
      console.log(from)
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
  
      
      const data = await response.text(); 
      const isValid = data.trim().toLowerCase() === "true"; //Convierte booleano 
      console.log("Respuesta del backend para la validación:", data, "Booleano convertido:", isValid);
      return isValid;
    } catch (error) {
      console.error("Error al verificar la transacción:", error);
      throw error;
    }
  }
  
  

  return (
    <div className="App">
      <h1>Pagar con Ethereum</h1>

      {!wallet && !loading && (
        <button onClick={conectandoWallet}>Conectar MetaMask</button>
      )}

      {loading && <p>Procesando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {transactionEnd && (
        <p style={{ color: "green" }}>Transacción completada con éxito</p>
      )}
    </div>
  );
}

export default Ethereum;
