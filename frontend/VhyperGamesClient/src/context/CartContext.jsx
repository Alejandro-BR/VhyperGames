import React, { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./authcontext";
import { GET_CART, UPDATE_CART, GET_CART_BY_GAMES, PUT_MERGE, DELETE_CART_DETAIL } from "../config";

// Crear el contexto del carrito
const CartContext = createContext({
  items: [],
  gameDetails: [],
  addItemToCart: () => { },
  removeFromCart: () => { },
  handleQuantityChange: () => { },
  fetchCartByGames: () => { },
  mergeCartWithDB: () => { },
  syncCartWithDB: () => { },
  deleteCartItem: () => { },
});

// Crear el provider
const CartProvider = ({ children }) => {
  const { token, userId } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [gameDetails, setGameDetails] = useState([]); //Se almacenan los juegos usados en CartListGames
  const [mergeCompleted, setMergeCompleted] = useState(false);

  useEffect(() => {
    const syncOrMergeCart = async () => {
      if (token && userId) {
        const storedCart = localStorage.getItem("cart");

        try {
          if (storedCart) {
            const parsedCart = JSON.parse(storedCart);

            if (Array.isArray(parsedCart.items) && parsedCart.items.length > 0) {
              // Si hay elementos en el carrito local, realizar un merge
              console.log("Realizando merge con la base de datos...");
              await mergeCartWithDB();
              setMergeCompleted(true);
            } else {
              // Si el carrito está vacío, obtener datos de la base de datos
              console.log("El carrito local está vacío. Obteniendo datos de la base de datos...");
              await getCartFromDB();
              setMergeCompleted(true);
            }
          } else {
            // Si no hay carrito en localStorage, obtener datos desde la base de datos
            console.log("No hay carrito en localStorage. Obteniendo datos de la base de datos...");
            await getCartFromDB();
            setMergeCompleted(true);
          }
        } catch (error) {
          console.error("Error durante la sincronización o el merge:", error);
        }
      }
    };

    syncOrMergeCart(); // Ejecuta la función async separada
  }, [token, userId]); // Solo se ejecuta al cambiar el token o el userId


  // Guardar carrito en LocalStorage cada vez que cambia
  const updateLocalStorage = (cart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error guardando cart en LocalStorage:", error);
    }
  };

  const fetchCartByGames = useCallback(async (gameIds) => {
    try {
      if (!Array.isArray(gameIds)) {
        console.error("gameIds no es un array válido:", gameIds);
        return;
      }

      const validGameIds = gameIds
        .map(id => Number(id))
        .filter(id => Number.isInteger(id) && id > 0);

      if (validGameIds.length === 0) {
        console.error("gameIds no contiene valores válidos:", gameIds);
        return;
      }

      const query = validGameIds.map(id => `gameIds=${id}`).join("&");
      const url = `${GET_CART_BY_GAMES}?${query}`;
      console.log("URL generada:", url);

      // Realizar la solicitud al backend
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener información de los juegos");
      }

      // Procesar la respuesta
      const data = await response.json();
      console.log("Datos obtenidos de la API:", data);
      setGameDetails(data);

    } catch (error) {
      console.error("Error al obtener información de juegos:", error.message);
      setGameDetails([]);
    }
  }, [token]);


  // Sincronizar carrito local con la base de datos (Merge, nuevo endpoint PUT)
  const mergeCartWithDB = async () => {
    if (token && userId) {
      const localItems = cart.items.map((item) => ({
        gameId: item.gameId,
        quantity: item.quantity || 0,
      }));

      try {
        const response = await fetch(PUT_MERGE, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(localItems),
        });

        if (!response.ok) {
          throw new Error("Error al hacer merge del carrito");
        }

        const mergedCart = await response.json();
        console.log("Carrito después del merge:", mergedCart);

        const formattedItems = mergedCart.map((item) => ({
          gameId: item.gameId,
          quantity: item.quantity,
        }));

        setCart({ items: formattedItems });
        updateLocalStorage({ items: formattedItems });
      } catch (error) {
        console.error("Error al sincronizar el carrito (merge):", error.message);
      }
    }
  };

  // Obtener el carrito desde la base de datos OK
  const getCartFromDB = async () => {
    if (token && userId) {
      try {
        const response = await fetch(`${GET_CART}`, {
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
        console.log("Datos del carrito obtenidos:", data);
        if (Array.isArray(data) && data.length > 0) {
          const formattedItems = data.map((item) => ({
            gameId: item.gameId,
            quantity: item.quantity,
          }));
          setCart({ items: formattedItems });
          updateLocalStorage({ items: formattedItems });
        } else {
          setCart({ items: [] });
          updateLocalStorage({ items: [] });
        }
      } catch (error) {
        console.error("Error al obtener el carrito desde la base de datos:", error.message);
      }
    }
  };




  const syncCartWithDB = async (updatedCart) => {
    if (token && userId) {
      const payload = updatedCart.items.map((item) => ({
        gameId: item.gameId,
        quantity: item.quantity || 0,
      }));
  
      console.log("Payload enviado al backend:", payload);
  
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
          const errorText = await response.text();
          console.error("Error del servidor al sincronizar el carrito:", errorText);
          throw new Error(`Error al sincronizar el carrito: ${response.status} - ${response.statusText}`);
        }
  
        console.log("Carrito sincronizado exitosamente.");
      } catch (error) {
        console.error("Error al sincronizar el carrito:", error.message);
      }
    }
  };
  

  // Añadir producto al carrito
  const addItemToCart = (product) => {
    setCart((prevCart) => {
      // Buscar si el producto ya existe en el carrito
      const existingItemIndex = prevCart.items.findIndex((item) => item.gameId === product.gameId);
      let newItems = [...prevCart.items];

      if (existingItemIndex !== -1) {
        // Producto ya existe, aumentamos cantidad
        const existingItem = newItems[existingItemIndex];
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + product.quantity
        };
      } else {
        // Producto nuevo, añadir al carrito
        newItems.push({
          ...product,
          quantity: product.quantity
        });
      }

      updateLocalStorage({ items: newItems });
      return { items: newItems };
    });
  };


  // Cambiar la cantidad de un producto (añadir y decrementar) - 0 +
  const handleQuantityChange = (gameId, operation) => {
    gameId = Number(gameId); // Asegura que el gameId sea un número
  
    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || []; // Asegura que 'items' sea un array
      const updatedItems = [...items];
      const productIndex = updatedItems.findIndex((item) => item.gameId === gameId);
      const product = updatedItems[productIndex];
  
      if (!product && operation === "increase") {
        // Caso: carrito vacío o producto no existe
        const newItem = { gameId, quantity: 1 };
        const updatedCart = { items: [...updatedItems, newItem] };
  
        updateLocalStorage(updatedCart); // Actualiza el localStorage
        syncCartWithDB(updatedCart); // Sincroniza el carrito actualizado con el backend
  
        return updatedCart;
      }
  
      if (product) {
        let newQuantity = product.quantity;
  
        if (operation === "increase") {
          newQuantity += 1;
        } else if (operation === "decrease") {
          newQuantity = Math.max(newQuantity - 1, 0);
        }
  
        if (newQuantity === 0) {
          // Eliminar producto si la cantidad llega a 0
          updatedItems.splice(productIndex, 1);
          const updatedCart = { items: updatedItems };
  
          updateLocalStorage(updatedCart); // Actualiza el localStorage
          syncCartWithDB(updatedCart); // Sincroniza el carrito restante
  
          return updatedCart;
        } else {
          // Actualizar cantidad
          updatedItems[productIndex] = { ...product, quantity: newQuantity };
          const updatedCart = { items: updatedItems };
  
          updateLocalStorage(updatedCart); // Actualiza el localStorage
          syncCartWithDB(updatedCart); // Sincroniza el carrito actualizado
  
          return updatedCart;
        }
      }
  
      return prevShoppingCart; // Si no hay cambios, devuelve el carrito anterior
    });
  };
  
 

  // Eliminar producto del carrito
  const removeFromCart = (gameId) => {
    setCart((prevShoppingCart) => {
      const updatedItems = prevShoppingCart.items.filter((item) => item.gameId !== gameId);
      const updatedCart = { items: updatedItems };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  async function deleteCartItem(gameId) {
    try {
        const response = await fetch(`${DELETE_CART_DETAIL}?gameId=${gameId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Asegúrate de tener el token
            },
        });

        if (response.status === 204) {
            console.log('Producto eliminado exitosamente.');
            setCart((prevCart) => {
              const updatedItems = prevCart.items.filter((item) => item.gameId !== gameId);
              const updatedCart = { items: updatedItems };
              updateLocalStorage(updatedCart);
              return updatedCart;
            });

        } else if (response.status === 404) {
            const error = await response.json();
            console.error('Error:', error.Message);

        } else if (response.status === 401) {
            console.error('No estás autorizado para realizar esta acción.');

        } else {
            console.error('Error al eliminar el producto.');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud DELETE:', error);
    }
}

  const ctxValue = {
    items: cart.items || [],
    gameDetails,
    addItemToCart,
    handleQuantityChange,
    removeFromCart,
    fetchCartByGames,
    mergeCartWithDB,
    syncCartWithDB,
    deleteCartItem,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
