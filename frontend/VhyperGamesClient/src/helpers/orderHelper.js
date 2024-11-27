export const createReserve = async (url, token) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al obtener la reserva.');
  }

  // Almacenar todos los datos en un solo objeto
  const reserveData = await response.json();

  return reserveData;
};
