import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./authcontext"; // Usamos el AuthContext para obtener el token y el userId
import { GET_CART, UPDATE_CART } from '../config'; // Importamos las URLs desde el archivo config.js

// Crear el contexto del carrito
export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    syncCartWithDB: () => { },
    getCartFromDB: () => { },
    updateQuantity: () => { },
    removeFromCart: () => { },
    handleUpdateCartItemQuantity: () => { },
});

// Crear el provider
export const CartProvider = ({ children }) => {
    const { token, userId } = useAuth(); // Obtener el token y la decodificación del token desde el AuthContext
    const [cart, setCart] = useState({ items: [] });

    // Cargar el carrito desde LocalStorage al iniciar
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCart({ items: parsedCart.items || [] });
        }
    }, []); // Solo se ejecuta una vez cuando se monta el componente

    // Guardar carrito en LocalStorage cuando cambie
    function updateLocalStorage(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Sincronizar carrito con la base de datos
    const syncCartWithDB = async () => {
        if (token && userId) {
            const payload = {
                userId: userId,
                cartId: userId, // O un ID único del carrito si es diferente
                games: cart.items.map((item) => ({
                    id: item.cartDetailId || 0,
                    idGame: item.id,
                    quantity: item.quantity || 0,
                })),
                totalPrice: cart.items.reduce(
                    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
                    0
                ),
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

                    setCart({ items: formattedGames }); // Actualiza el estado con los juegos recibidos
                    localStorage.setItem("cart", JSON.stringify({ items: formattedGames })); // Guarda en localStorage
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
    const handleAddItemToCart = (id) => {
        setCart((prevShoppingCart) => {
            const updateItems = [...prevShoppingCart.items];
            const existingCartItemIndex = updateItems.findIndex((cartItem) => cartItem.id === id);

            if (existingCartItemIndex !== -1) {
                // Si el producto ya existe, solo se incrementa la cantidad
                updateItems[existingCartItemIndex] = {
                    ...updateItems[existingCartItemIndex],
                    quantity: updateItems[existingCartItemIndex].quantity + 1,
                };
            } else {
                // Si el producto no existe, lo añadimos con cantidad 1
                const newProduct = { id, quantity: 1 };
                updateItems.push(newProduct);
            }

            // Actualizamos el localStorage
            updateLocalStorage({ items: updateItems });

            // Si el usuario está logueado, sincronizamos con la base de datos
            if (token && userId) {
                syncCartWithDB();
            }

            return { items: updateItems };
        });
    };

    // Actualizar la cantidad de un producto
    const handleUpdateCartItemQuantity = (productId, amount) => {
        setCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];

            const updatedItemIndex = updatedItems.findIndex((item) => item.id === productId);
            const updatedItem = { ...updatedItems[updatedItemIndex] };

            updatedItem.quantity += amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1); // Elimina el producto si la cantidad es <= 0
            } else {
                updatedItems[updatedItemIndex] = updatedItem; // Actualiza el item
            }

            updateLocalStorage({ items: updatedItems });

            // Si el usuario está logueado, sincronizamos con la base de datos
            if (token && userId) {
                syncCartWithDB();
            }

            return { items: updatedItems };
        });
    };

    // Eliminar producto del carrito
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.items.filter((item) => item.id !== id));
    };

    // Sincronizar carrito con la base de datos solo cuando se modifique
    useEffect(() => {
        if (token) {
            syncCartWithDB();
        }
    }, [cart.items, token]); // Solo sincroniza si el carrito cambia o el token es modificado

    // Obtener el carrito desde la base de datos solo al inicio o cuando se cambie el token
    useEffect(() => {
        if (token && userId) {
            getCartFromDB();
        }
    }, [token, userId]); // Se ejecuta cuando el token o el userId cambian

    const ctxValue = {
        items: cart.items,
        addItemToCart: handleAddItemToCart,
        handleUpdateCartItemQuantity,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };