import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./authcontext"; // Usamos el AuthContext para obtener el token y el userId
import { GET_CART, UPDATE_CART } from '../config'; // Importamos las URLs desde el archivo config.js

// Crear el contexto del carrito
export const CartContext = createContext();

// Crear el provider
export const CartProvider = ({ children }) => {
    const { token, decodedToken } = useAuth(); // Obtener el token y la decodificación del token desde el AuthContext
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
            const userId = decodedToken.id; // Obtiene el ID del usuario desde el token decodificado

            const payload = {
                userId: userId,
                cartId: userId, // O un ID único del carrito si es diferente
                games: cart.map((item) => ({
                    id: item.cartDetailId || 0,
                    idGame: item.id,
                    title: item.title || "Título no disponible",
                    price: item.price || 0,
                    totalPrice: (item.price || 0) * (item.quantity || 0),
                    imageGames: {
                        id: item.imageId || 0,
                        gameId: item.id,
                        imageUrl: item.image || "URL de imagen por defecto",
                        altText: item.imageAlt || "Texto alternativo no disponible",
                    },
                    quantity: item.quantity || 0,
                    stock: item.stock || 0,
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
        if (token && decodedToken) {
            const userId = decodedToken.id; // Obtener el ID del usuario desde el token

            try {
                // Realizar la solicitud GET con el userId en la URL
                const response = await fetch(`${GET_CART}/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Incluir el token en las cabeceras
                    },
                });

                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Error al obtener el carrito: ${response.status} - ${errorMessage}`);
                }

                const data = await response.json();

                // Guardar los datos del carrito en el estado de React
                setCart(data.games.map((item) => ({
                    id: item.idGame,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    stock: item.stock,
                    image: item.imageGames.imageUrl,
                    imageAlt: item.imageGames.altText,
                    imageId: item.imageGames.id,
                })));

                // Guardar los datos en LocalStorage
                localStorage.setItem("cart", JSON.stringify(data.games));

            } catch (error) {
                console.error("Error al obtener el carrito desde la base de datos:", error.message);
                alert(`Hubo un problema al obtener el carrito: ${error.message}`);
            }
        }
    };

    // Método para agregar el producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                // Si el producto ya está en el carrito, actualizamos la cantidad
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: product.quantity }  // Actualizamos con la cantidad proporcionada
                        : item
                );
            } else {
                // Si el producto no existe en el carrito, lo añadimos con la cantidad proporcionada
                return [...prevCart, { ...product }];
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
        if (token) {
            getCartFromDB();
        }
    }, [token]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
