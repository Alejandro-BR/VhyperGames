export const getImages = async (url, gameId, token) => {
  const fullUrl = `${url}?gameId=${gameId}`;

  try {
      const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Error al obtener las imágenes.');
      }

      const data = await response.json();
      return data; 
  } catch (error) {
      console.error("Error en getImages:", error);
      throw error; 
  }
};

export const newImages = async (url, gameId, data, token) => {
  const fullUrl = `${url}?gameId=${gameId}`;

  const formData = new FormData();

  if (data.images && data.images.length > 0) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  } else {
    throw new Error("Debe proporcionar al menos una imagen.");
  }

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Error desconocido" }));
    throw new Error(error.message || "Error al agregar las imágenes.");
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  }

  return { message: "Operación completada con éxito." };
};


export const updateImages = async (url, gameId, altText, imageId, data, token) => {
  const fullUrl = `${url}/${gameId}?AltText=${altText}&imageId=${imageId}`

  const formData = new FormData();
  if (data.img1) {
    formData.append("file", data.img1);
  }

  formData.append("altText", altText);

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
  const fullUrl = `${url}?imageId=${imageId}`;

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
  });

  if (response.status === 204) {
  } else if (response.status === 404) {
    const error = await response.json();
    console.error('Error:', error.Message);
  } else {
    const errorText = await response.text();
    console.error('Error al eliminar la imagen:', errorText);
  }
};
