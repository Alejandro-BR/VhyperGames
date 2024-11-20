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
        console.error("Error parseo cart from Localstorage:", error);
        setCart({ items: [] }); 
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

  // function sincronizarCarrito(carritoBackend){

  //   //Hacer concat pero si el id ya está que sume somo cantidad
  // }

  // Sincronizar carrito con la base de datos P
  //CAMBIAR PETICION 
  const syncCartWithDB = async () => {
    if (token && userId) {
      // Crear el array de objetos para los juegos
      const payload = cart.items.map((item) => ({
        gameId: item.id,       
        quantity: item.quantity || 0, 
      }));
  
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
        const response = await fetch(`${GET_CART}`, { //GET
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
            gameId: item.idGame,  
            quantity: item.quantity,  
          }));
  
          setCart({ items: formattedGames });
          updateLocalStorage({ items: formattedGames });
        }
      } catch (error) {
        console.error("Error al obtener el carrito desde la base de datos:", error.message);
      }
    }
  };
  

  const addItemToCart = (product) => {
    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || [];
      const existingItemIndex = items.findIndex((item) => item.id === product.id);
  
      let updatedItems;
      if (existingItemIndex !== -1) {
        // Si el producto ya está en el carrito, solo incrementamos la cantidad
        updatedItems = items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + product.quantity } // Incrementamos la cantidad
            : item
        );
      } else {
        // Si no está, lo añadimos al carrito con la cantidad que se pasa
        updatedItems = [...items, { ...product }];
      }
  
      const updatedCart = { items: updatedItems };
      updateLocalStorage(updatedCart); // Guardamos en localStorage
      return updatedCart;
    });
  };
  

  // Actualizar la cantidad de un producto
  const handleUpdateCartItemQuantity = (productId, quantitys) => {
    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || [];
      const updatedItems = items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity + quantitys, 0) }
          : item
      );
  
      const filteredItems = updatedItems.filter((item) => item.quantity > 0);
      const updatedCart = { items: filteredItems };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };
  

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
