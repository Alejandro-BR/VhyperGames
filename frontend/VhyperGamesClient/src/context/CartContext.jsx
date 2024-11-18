import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./authcontext"; // Usamos el AuthContext para obtener el token y el userId
import { GET_CART, UPDATE_CART } from '../config'; // Importamos las URLs desde el archivo config.js

// Crear el contexto del carrito
export const CartContext = createContext();

// Crear el provider
export const CartProvider = ({ children }) => {
    const { token, userId } = useAuth(); // Obtener el token y la decodificación del token desde el AuthContext
    const [cart, setCart] = useState([]);

    // Cargar LocalStorage al iniciar
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []); // Solo se ejecuta una vez cuando se monta el componente

    // Guardar carrito en LocalStorage cuando cambie
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); // Se ejecuta cada vez que cart cambie

    // Sincronizar carrito con la base de datos
    const syncCartWithDB = async () => {
        if (token && userId) {
            const payload = {
                userId: userId,
                cartId: userId, // O un ID único del carrito si es diferente
                games: cart.map((item) => ({
                    id: item.cartDetailId || 0,
                    idGame: item.id,
                    quantity: item.quantity || 0,
                })),
                totalPrice: cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0),
            };

            try {
                const response = await fetch(UPDATE_CART, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error(`Error al sincronizar el carrito: ${response.statusText}`);
                }

                console.log("Carrito sincronizado exitosamente:", await response.json());
            } catch (error) {
                console.error("Error al sincronizar el carrito:", error.message);
            }
        }
    };

    // Obtener el carrito desde la base de datos (GET)
    const getCartFromDB = async () => {
        if (token && userId) {
            try {
                const response = await fetch(`${GET_CART}/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Error al obtener el carrito: ${response.status} - ${errorMessage}`);
                }

                const data = await response.json();

                console.log('Cart data received:', data); // Ver la respuesta completa

                // Si la respuesta tiene juegos
                if (data && data.games && data.games.length > 0) {
                    const formattedGames = data.games.map((item) => ({
                        id: item.idGame,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        stock: item.stock,
                        image: item.imageGames.imageUrl,
                        imageAlt: item.imageGames.altText,
                        imageId: item.imageGames.id,
                    }));

                    setCart(formattedGames); // Actualiza el estado con los juegos recibidos
                    localStorage.setItem("cart", JSON.stringify(formattedGames)); // Guarda en localStorage
                    console.log("Cart data saved to localStorage", formattedGames);
                } else {
                    console.log("No games found in cart");
                }

            } catch (error) {
                console.error("Error al obtener el carrito desde la base de datos:", error.message);
                alert(`Hubo un problema al obtener el carrito: ${error.message}`);
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
                        ? { ...item, quantity: item.quantity + 1 }
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

    // Obtener el carrito desde la base de datos solo al inicio o cuando se cambie el token
    useEffect(() => {
        if (token && userId) {
            getCartFromDB();
        }
    }, [token, userId]); // Se ejecuta cuando el token o el userId cambian

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
