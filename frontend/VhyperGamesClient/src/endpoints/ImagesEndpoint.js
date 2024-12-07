export const getImages = async (url, gameId, token) => {
  // Asegúrate de que gameId esté correctamente añadido a la URL como un query parameter
  const fullUrl = `${url}?gameId=${gameId}`;
  console.log("URL construida:", fullUrl); // Verifica la URL antes de la llamada

  try {
      const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Asegúrate de que el token sea válido
          },
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error al obtener las imágenes.');
      }

      const data = await response.json();
      return data; // Regresa las imágenes obtenidas
  } catch (error) {
      console.error("Error en getImages:", error);
      throw error; // Lanza el error para manejarlo en otra parte
  }
};


export const newImages = async (url, gameId, altText, data, token) => {
  const fullUrl = `${url}?AltText=${altText}&gameId=${gameId}`

  const formData = new FormData();
  if (data.image) {
    formData.append("images", data.image);
  }

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "Error al crear el juego.");
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  }

  return { message: "Operación completada con éxito." };
};

export const updateImages = async (url, gameId, altText, imageId, data, token) => {
  const fullUrl = `${url}/updateImage/${gameId}?AltText=${altText}&imageId=${imageId}`

  const formData = new FormData();
  if (data.img1) {
    formData.append("images", data.img1);
  }

  const response = await fetch(fullUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "Error al crear el juego.");
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  }

  return { message: "Operación completada con éxito." };
};

export const deleteImages = async (url, imageId, token) => {
  const fullUrl = `${url}?imageId=${imageId}`

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });


  if (response.status === 204) {
    console.log("Imagen eliminada");
  } else if (response.status === 404) {
    const error = await response.json();
    console.error('Error:', error.Message);
  } else {
    console.error('Error al eliminar el producto.');
  }
};