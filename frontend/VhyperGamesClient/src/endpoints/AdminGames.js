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

export const updateGamesAdmin = async (url, userId, token) => {

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



export const UPDATE_GAME = `${API_BASE_URL}AdminGame/update`;
export const NEW_GAME = `${API_BASE_URL}AdminGame/newGame`;
export const GET_SEARCH_GAMES_ADMIN = `${API_BASE_URL}AdminGame/search`;
export const GET_FORM_GAME = `${API_BASE_URL}AdminGame/get-form`;