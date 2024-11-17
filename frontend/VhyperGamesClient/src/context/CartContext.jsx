import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./authcontext"; // Usamos el AuthContext para obtener el token y el userId

// 1. Creo el contexto del carrito
export const CartContext = createContext();

// 2. Creo el provider
export const CartProvider = ({ children }) => {
    const { token, decodedToken } = useAuth(); // Obtenemos el token y la decodificación del token desde el AuthContext
    const [cart, setCart] = useState([]);

    // Cargar LocalStorage al iniciar
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Guardar carrito en LocalStorage cuando cambie
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Sincronizar carrito con la base de datos
    const syncCartWithDB = async () => {
        if (token && decodedToken) {
            const userId = decodedToken.id; // Id del usuario desde el token decodificado

            try {
                await fetch("/api/cart/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Cambia según sea necesario
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId: userId,
                        cartItems: cart,
                    }),
                });
            } catch (error) {
                console.error("Error al sincronizar el carrito:", error);
            }
        }
    };

    // Añadir producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                // Si el producto ya está en el carrito, solo incrementamos su cantidad en 1
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 } // Incrementamos solo 1
                        : item
                );
            } else {
                // Si el producto no existe, lo añadimos con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };


    // Actualizar la cantidad de un producto
    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Eliminar producto del carrito
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Sincronizar carrito con la base de datos solo cuando se modifique
    useEffect(() => {
        if (token) {
            syncCartWithDB();
        }
    }, [cart, token]); // Solo sincroniza si el carrito cambia o el token es modificado

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
