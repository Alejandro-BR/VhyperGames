// config.js
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = `${BASE_URL}api/`;

/* ENDPOINTS DE LOGIN Y REGISTRO */
export const LOGIN_ENDPOINT = `${API_BASE_URL}auth/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}auth/register`;

/* ENDPOINTS DE CATÁLOGO */
export const CATALOG_SALES = `${API_BASE_URL}catalog/sales`;
export const CATALOG_NEW_RELEASES = `${API_BASE_URL}catalog/new-releases`;
export const CATALOG_FILTER = `${API_BASE_URL}catalog/catalog-search`;

/* ENDPOINTS DE VISTA DETALLE */
export const DETAILS_VIEW_GAME_DATA = `${API_BASE_URL}detailsview/game-data`;
export const DETAILS_VIEW_GAME_PRICE = `${API_BASE_URL}detailsview/game-price`;
export const GAME_REQUERIMENTS = `${API_BASE_URL}detailsview/game-requirements`;
export const NEW_REVIEW = `${API_BASE_URL}detailsview/new-review`;
export const GET_REVIEW_BY_USER = `${API_BASE_URL}detailsview/get-user-review`;
export const GET_REVIEW = `${API_BASE_URL}DetailsView/game-reviews`;

/* ENDPOINTS DE CARRITO */
export const GET_CART = `${API_BASE_URL}Cart/cartById`;
export const UPDATE_CART = `${API_BASE_URL}Cart/update`;
export const GET_CART_BY_GAMES = `${API_BASE_URL}Cart/cartByGames`;
export const PUT_MERGE = `${API_BASE_URL}Cart/mergeCart`;
export const DELETE_CART_DETAIL = `${API_BASE_URL}Cart/deleteCartDetail`;

/* ENDPOINTS DE CHECKOUT */
/* STRIPE */
export const CREATE_PAYMENT_SESSION = `${API_BASE_URL}Reserve/embedded-checkout`;