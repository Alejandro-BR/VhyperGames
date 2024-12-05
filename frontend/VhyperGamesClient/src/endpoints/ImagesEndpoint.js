export const getImages = async (url, gameId, token) => {
    const fullUrl = `${url}/${gameId}`

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

export const newImage = async (url, gameId, altText, data, token) => {
    const fullUrl = `${url}/${gameId}?AltText=${altText}&gameId=${gameId}`

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
    const fullUrl = `${url}/${gameId}?AltText=${altText}&imageId=${imageId}`

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