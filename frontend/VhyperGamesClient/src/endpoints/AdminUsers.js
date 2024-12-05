export const getUsersAdmin = async (url, token) => {

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

export const updateRol = async (url, userId, token) => {
    const fullUrl = `${url}?userId=${userId}`;
    const response = await fetch(fullUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let errorMessage = 'Error al actualizar el rol.';
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch {

        }
        throw new Error(errorMessage);
    }
    try {
        return await response.json();
    } catch {
        return null; 
    }
};


export const deleteUser = async (url, userId, token) => {
    const fullUrl = `${url}?userId=${userId}`;
    const response = await fetch(fullUrl, {
        method: 'DELETE',
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

export const searchUser = async (url, data, token) => {
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
        throw new Error(error.message || 'Error al buscar al usuario.');
    }

    return await response.json();
};