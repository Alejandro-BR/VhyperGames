import { BLOCKCHAIN_TRANSACTION, BLOCKCHAIN_CHECK } from "../config";

//ENDPOINT_BLOCKCHAIN_TRANSACTION
export const fetchTransactionData = async (reserveId, token) => {
  try {
    const response = await fetch(BLOCKCHAIN_TRANSACTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reserveId: reserveId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la API`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error al obtener datos de transacción:");
    throw err;
  }
};

//ENDPOINT_BLOCKCHAIN_CHECK
export const verifyTransaction = async (txHash, wallet, transactionData, token) => {
  try {
    const response = await fetch(BLOCKCHAIN_CHECK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hash: txHash,
        from: wallet,
        value: transactionData.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la API (${response.status}): ${await response.text()}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error al verificar la transacción:", err.message);
    throw err;
  }
};
