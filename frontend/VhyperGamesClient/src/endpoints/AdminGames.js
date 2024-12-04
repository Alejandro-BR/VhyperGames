export const getGamesAdmin = async (url, token) => {

    const response = await fetch(url, {
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

    return await response.json();
};

export const updateGames = async (url, data, token) => {

    const formData = new FormData();
    
    formData.append("id", data.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("sinopsis", data.sinopsis);
    formData.append("genre", parseInt(data.genre, 10));
    formData.append("gameRequirementsId", parseInt(data.gameRequirementsId, 10));
    formData.append("drmFree", data.drmFree);
    formData.append("releaseDate", data.releaseDate);
    formData.append("price", parseInt(data.price, 10));
    formData.append("stock", parseInt(data.stock, 10));

    if (data.img1) {
        formData.append("images", data.img1);
    }

    if (Array.isArray(data.images)) {
        data.images.forEach((image) => {
            formData.append("images", image);
        });
    } else {
        console.error("El campo 'images' no es un arreglo:", data.images);
    }

    if (data.alt && data.alt.length > 0) {
        data.alt.forEach((altText, index) => {
            formData.append(`alt[${index}]`, altText);
        });
    }

    const response = await fetch(url, {
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


export const newGame = async (url, data, token) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("sinopsis", data.sinopsis);
    formData.append("genre", parseInt(data.genre, 10));
    formData.append("gameRequirementsId", parseInt(data.gameRequirementsId, 10));
    formData.append("drmFree", data.drmFree);
    formData.append("releaseDate", data.releaseDate);
    formData.append("price", parseInt(data.price, 10));
    formData.append("stock", parseInt(data.stock, 10));

    if (data.img1) {
        formData.append("images", data.img1);
    }

    if (Array.isArray(data.images)) {
        data.images.forEach((image) => {
            formData.append("images", image);
        });
    } else {
        console.error("El campo 'images' no es un arreglo:", data.images);
    }

    if (data.alt && data.alt.length > 0) {
        data.alt.forEach((altText, index) => {
            formData.append(`alt[${index}]`, altText);
        });
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
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

export const searchGame = async (url, data, token) => {
    const fullUrl = `${url}?search=${data}`
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

    return await response.json();
};

export const getFormGame = async (url, gameId, token) => {
    const fullUrl = `${url}?gameId=${gameId}`
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

    return await response.json();
};
