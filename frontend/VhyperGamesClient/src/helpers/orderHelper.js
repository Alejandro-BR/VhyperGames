export const recentOrder = async (url, token) => {
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); 
    throw new Error(`Error al obtener la reserva: ${response.status} - ${errorText}`);
  }

  return await response.json();
};
