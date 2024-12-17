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
export const CREATE_RESERVE = `${API_BASE_URL}Reserve/create`;
export const GET_RESERVE_DETAILS = `${API_BASE_URL}Reserve/details`;
export const PAYMENT_STATUS = `${API_BASE_URL}Reserve/status`;
export const CONFIRM_RESERVE = `${API_BASE_URL}Reserve/confirm`;

/* ENDPOINTS ORDER */
export const ORDER_BY_ID = `${API_BASE_URL}Order/get-by-id`;
export const ORDER_BY_USER = `${API_BASE_URL}Order/all-user-orders`;

/* ENDPOINTS DE USUARIO*/
export const GET_USER =  `${API_BASE_URL}User/get-user`;
export const UPDATE_USER =  `${API_BASE_URL}User/update-user`;
export const UPDATE_PASSWORD = `${API_BASE_URL}User/update-password`

/* ETHEREUM */
export const BLOCKCHAIN_TRANSACTION = `${API_BASE_URL}Blockchain/transaction`;
export const BLOCKCHAIN_CHECK = `${API_BASE_URL}Blockchain/check`;

/* ENDPOINTS ADMIN USERS */
export const GET_USERS_ADMIN = `${API_BASE_URL}AdminUser/get-users`;
export const GET_SEARCH_USERS_ADMIN = `${API_BASE_URL}AdminUser/search`;
export const UPDATE_USER_ROL = `${API_BASE_URL}AdminUser/update-rol`;
export const DELETE_USER = `${API_BASE_URL}AdminUser/delete`;

/* ENDPOINTS ADMIN GAME */
export const GET_GAMES_ADMIN = `${API_BASE_URL}AdminGame/get-games`;
export const UPDATE_GAME = `${API_BASE_URL}AdminGame/update`;
export const NEW_GAME = `${API_BASE_URL}AdminGame/newGame`;
export const GET_SEARCH_GAMES_ADMIN = `${API_BASE_URL}AdminGame/search`;
export const GET_FORM_GAME = `${API_BASE_URL}AdminGame/get-form`;

/* ENDPOINTS DE IMÁGENES */
export const GET_IMAGES_BY_GAME = `${API_BASE_URL}Images/images-byGame`;
export const UPDATE_IMAGE = `${API_BASE_URL}Images/updateImage`;
export const DELETE_IMAGE = `${API_BASE_URL}Images/delete`;
export const NEW_IMAGE = `${API_BASE_URL}Images/newImages`;

/* RESERVE ETHEREUM */
export const BLOCKCHAIN_TOTAL_RESERVE = `${API_BASE_URL}Reserve/total`;