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
        method: 'POST',
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
    const fullUrl = `${url}?reserveId=${reserveId}`

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Reserva confirmada exitosamente:", data.message);
      return data;
    } else {
      console.error("Error al confirmar la reserva.");
    }
  } catch (error) {
    console.error("Ocurrió un error:", error.message);
  }
}
