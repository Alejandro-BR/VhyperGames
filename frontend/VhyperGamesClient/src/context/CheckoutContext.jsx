import { createContext, useState, useContext, useEffect, useRef } from 'react';


// Crear el contexto de checkout
export const CheckoutContext = createContext();

// Hook personalizado para consumir el contexto
export const useCheckout = () => {
    return useContext(CheckoutContext);
};

// Proveedor del contexto
export const CheckoutProvider = ({ children }) => {


    const contextValue = {

    };



    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
