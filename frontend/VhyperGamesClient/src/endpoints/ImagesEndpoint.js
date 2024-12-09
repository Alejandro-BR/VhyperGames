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


export const newImages = async (url, gameId, altText, data, token) => {
  const fullUrl = `${url}?AltText=${altText}&gameId=${gameId}`

  const formData = new FormData();
  if (data.image) {
    formData.append("file", data.image);
  }

  formData.append("altText", altText);

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
  const fullUrl = `${url}/${gameId}?AltText=${altText}&imageId=${imageId}`

  const formData = new FormData();
  if (data.img1) {
    formData.append("file", data.img1);
  }

  formData.append("altText", altText);

  console.log("FormData antes de enviar:", Array.from(formData.entries()));

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
  // Asegurándonos de que la URL esté bien construida
  const fullUrl = `${url}?imageId=${imageId}`;

  const response = await fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Asegúrate de que el token esté incluido
    },
  });

  // Verificamos si la respuesta es exitosa (204 No Content)
  if (response.status === 204) {
    console.log("Imagen eliminada");
  } else if (response.status === 404) {
    // Si la imagen no se encuentra
    const error = await response.json();
    console.error('Error:', error.Message);
  } else {
    // En caso de cualquier otro error
    const errorText = await response.text();
    console.error('Error al eliminar la imagen:', errorText);
  }
};
