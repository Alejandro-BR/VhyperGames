export const createReserve = async (url, reserveData, token) => {
    const fullUrl = `${url}?modeOfPay=${reserveData.modeOfPay}`

    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Token de autenticación
        },
        body: JSON.stringify(reserveData.cart.items),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear la reserva.');
    }

    return await response.json();
};