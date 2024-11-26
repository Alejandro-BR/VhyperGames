import { getVarLS } from "../utils/keep";

let reserve = null;

export const setReserve = () => {
    reserve = getVarLS("cart");
};

export const getReserve = () => {
    return reserve;
};


