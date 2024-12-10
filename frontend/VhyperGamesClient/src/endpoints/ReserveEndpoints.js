export const createReserve = async (url, reserveData, token) => {
    const fullUrl = `${url}?modeOfPay=${reserveData.modeOfPay}`

    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reserveData.reserve.items),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la reserva.');
    }

    return await response.json();
};

export const getReserveDetails = async (url, reserveId, token) => {
    const fullUrl = `${url}?reserveID=${reserveId}`

    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la reserva.');
    }

    const data = await response.json();
    return data;
};

export async function confirmReserve(url, reserveId, token) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reserveId),
    });

    if (response.ok) {
      const data = await response.json();
      return data.orderId;
    } else {
      console.error("Error al confirmar la reserva.");
      return -1;
    }
  } catch (error) {
    console.error("Ocurrió un error:", error.message);
    return -1;
  }
}

export const getSessionStripe = async (url, sessionId, token) => {
  const fullUrl = `${url}/${sessionId}`
  const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear la reserva.');
  }

  const data = await response.json();
  return data;
};