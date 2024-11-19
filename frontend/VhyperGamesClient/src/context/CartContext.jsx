import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./authcontext";
import { GET_CART, UPDATE_CART } from "../config";

// Crear el contexto del carrito
const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  handleUpdateCartItemQuantity: () => {},
  removeFromCart: () => {},
});

// Crear el provider
const CartProvider = ({ children }) => {
  const { token, userId } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  // Cargar el carrito desde LocalStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart({ items: parsedCart.items || [] });
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCart({ items: [] }); // Fallback a un carrito vacío
      }
    }
  }, []);

  // Guardar carrito en LocalStorage cada vez que cambia
  const updateLocalStorage = (cart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  };

  // Sincronizar carrito con la base de datos
  const syncCartWithDB = async () => {
    if (token && userId) {
      const payload = {
        userId,
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

        console.log("Carrito sincronizado exitosamente.");
      } catch (error) {
        console.error("Error al sincronizar el carrito:", error.message);
      }
    }
  };

  // Obtener el carrito desde la base de datos
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
          throw new Error("Error al obtener el carrito");
        }

        const data = await response.json();

        if (data && data.games) {
          const formattedGames = data.games.map((item) => ({
            id: item.idGame,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            stock: item.stock,
            image: item.imageGames?.imageUrl || "",
            imageAlt: item.imageGames?.altText || "",
          }));

          setCart({ items: formattedGames });
          updateLocalStorage({ items: formattedGames });
        }
      } catch (error) {
        console.error("Error al obtener el carrito desde la base de datos:", error.message);
      }
    }
  };

  // Añadir producto al carrito
  const addItemToCart = (product) => {
    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || [];
      const existingItemIndex = items.findIndex((item) => item.id === product.id);

      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: Math.min(item.quantity + product.quantity, product.stock) }
            : item
        );
      } else {
        updatedItems = [...items, product];
      }

      const updatedCart = { items: updatedItems };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Actualizar la cantidad de un producto
  const handleUpdateCartItemQuantity = (productId, amount) => {
    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || [];
      const updatedItems = items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity + amount, 0) }
          : item
      );
  
      const filteredItems = updatedItems.filter((item) => item.quantity > 0);
      const updatedCart = { items: filteredItems };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };
  

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || [];
      const updatedItems = items.filter((item) => item.id !== id);
      const updatedCart = { items: updatedItems };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Sincronizar carrito con la base de datos al cambiar
  useEffect(() => {
    if (token && cart.items.length > 0) {
      syncCartWithDB();
    }
  }, [cart.items, token]);

  // Obtener carrito desde la base de datos al iniciar sesión
  useEffect(() => {
    if (token && userId) {
      getCartFromDB();
    }
  }, [token, userId]);

  const ctxValue = {
    items: cart.items || [],
    addItemToCart,
    handleUpdateCartItemQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
