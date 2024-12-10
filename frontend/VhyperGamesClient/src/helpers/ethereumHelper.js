//ENDPOINT DE RESERVA PARA OBTENER EL TOTAL CUANDO NO TE LOGUEAS
export async function fetchReserveTotal(url, reserveId, token) {
  const authToken = typeof token === "object" ? token.token : token;

  if (!authToken) {
    throw new Error("Token no proporcionado. Verifica tu autenticación.");
  }

  const fullUrl = `${url}?reserveId=${reserveId}`;

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener el total de la reserva: ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error en fetchReserveTotal:", err.message);
    throw err;
  }
}


