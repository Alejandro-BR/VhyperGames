import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { GET_CART, UPDATE_CART, GET_CART_BY_GAMES, PUT_MERGE, DELETE_CART_DETAIL } from "../config";
import { getVarLS, getVarSessionStorage, updateLocalStorage } from "../utils/keep";

// Crear el contexto
const CartContext = createContext({
  items: [],
  gameDetails: [],
  removeFromCart: () => { },
  handleQuantityChange: () => { },
  fetchCartByGames: () => { },
  mergeCartWithDB: () => { },
  syncCartWithDB: () => { },
  deleteCartItem: () => { },
  refreshCart: () => { },
});

// Crear el provider
const CartProvider = ({ children }) => {
  const { token, userId, isLoggedIn } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [gameDetails, setGameDetails] = useState([]); 

  useEffect(() => {
    const performMerge = async () => {
      if (isLoggedIn && token && userId) {
        await mergeCartWithDB();
      }
    };

    performMerge();
  }, [isLoggedIn, token, userId]);

  useEffect(() => {
    const syncCartIfNeeded = async () => {
        const storedCart = getVarLS("cart");
        if (token && userId) {
            try {
                if (!storedCart || !storedCart.items || storedCart.items.length > 0) {
                    await getCartFromDB();
                }
            } catch (error) {
                console.error("Error al sincronizar el carrito:", error);
            }
        }
    };
    syncCartIfNeeded();
}, [token, userId]);

  useEffect(()=> {
   refreshCart();
  },[]);

  const refreshCart = async () => {
    if (token) {
      await getCartFromDB();
    } else {
      const storedCart = getVarLS("cart");
      if (storedCart) {
        setCart(storedCart);
      }
    }
  };
  

  // Guardar carrito en LocalStorage cada vez que cambia
  const updateLocalStorageCart = (cart) => {
    try {
      updateLocalStorage(cart,"cart");
    } catch (error) {
      console.error("Error guardando cart en LocalStorage:", error);
    }
  };

  useEffect(() => {
    const clearCartIfSessionTokenMissing = () => {
      const localToken = getVarLS("accesstoken");
      const sessionToken = getVarSessionStorage("accesstoken");
  
      if (localToken) {
        return;
      }
  
      if (!sessionToken) {
        setCart({ items: [] });
        updateLocalStorageCart({ items: [] });
      }
    };
  
    const delayCheck = setTimeout(() => {
      clearCartIfSessionTokenMissing();
    }, 50);
  
    const handleStorageChange = (event) => {
      if (event.key === "token" && event.storageArea === sessionStorage) {
        const localToken = getVarLS("accesstoken");
        const sessionToken = getVarSessionStorage("accesstoken");
  
        if (localToken) {
          return;
        }

        if (!sessionToken) {
          setCart({ items: [] });
          updateLocalStorageCart({ items: [] });
        }
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      clearTimeout(delayCheck);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  
  
  // ENDPOINT - GET_CART_BY_GAMES - Sincronizar carrito local con la base de datos
  const fetchCartByGames = useCallback(async (gameIds) => {
    try {
      //Comprobar los Id para crear la query
      if (!Array.isArray(gameIds)) {
        console.error("gameIds no es un array válido:", gameIds);
        return;
      }
      //Convertimos Id en números y filtramos
      const validGameIds = gameIds
        .map(id => Number(id))
        .filter(id => Number.isInteger(id) && id > 0);

      if (validGameIds.length === 0) {
        console.error("gameIds no contiene valores válidos:", gameIds);
        return;
      }
      //Ejemplo query `gameIds=1&gameIds=2`
      const query = validGameIds.map(id => `gameIds=${id}`).join("&");
      const url = `${GET_CART_BY_GAMES}?${query}`;

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
      setGameDetails(data);
    } catch (error) {
      console.error("Error al obtener información de juegos:", error.message);
      setGameDetails([]);
    }
  }, [token]);

  // ENDPOINT - PUT_MERGE - Sincronizar carrito local con la base de datos
  const mergeCartWithDB = async () => {
    if (token && userId) {
  
      const cartCopy = { ...cart };
  
      // Guardamos una copia en localStorage para depurar
      updateLocalStorage(cartCopy, "reserve");
  
      // Preparar los elementos del carrito local
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
          const errorText = await response.text();
          console.error("Error al hacer merge del carrito. Respuesta del servidor:", errorText);
          throw new Error("Error al hacer merge del carrito");
        }
  
        // Procesar el carrito combinado que devuelve el backend
        const mergedCart = await response.json();
  
        // Formatear los datos recibidos para actualizar el estado
        const formattedItems = mergedCart.map((item) => ({
          gameId: item.gameId,
          quantity: item.quantity,
        }));
  
        // Actualizar el estado del carrito y el localStorage
        setCart({ items: formattedItems });
        updateLocalStorageCart({ items: formattedItems });
      } catch (error) {
        console.error("Error al sincronizar el carrito (merge):", error.message);
      }
    } else {
      console.warn("mergeCartWithDB fue llamado sin un token o userId válido");
    }
  };
  
  // ENDPOINT - GET_CART - Obtener el carrito desde la base de datos
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
        // Verifica si los datos recibidos son un array y contienen elementos
        if (Array.isArray(data) && data.length > 0) {
          const formattedItems = data.map((item) => ({
            gameId: item.gameId,
            quantity: item.quantity,
          }));
          setCart({ items: formattedItems });
          updateLocalStorageCart({ items: formattedItems });
        } else {
          setCart({ items: [] });
          updateLocalStorageCart({ items: [] });
        }
      } catch (error) {
        console.error("Error al obtener el carrito desde la base de datos:", error.message);
      }
    }
  };

  // ENDPOINT - UPDATE_CART - Obtener el carrito desde la base de datos
  const syncCartWithDB = async (updatedCart) => {
    if (token && userId) {
      const payload = updatedCart.items.map((item) => ({
        gameId: item.gameId,
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
          const errorText = await response.text();
          console.error("Error del servidor al sincronizar el carrito:", errorText);
          throw new Error(`Error al sincronizar el carrito: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error al sincronizar el carrito:", error.message);
      }
    }
  };

    // ENDPOINT - DELETE_CART_DETAIL - Elimina item de user logueado
    async function deleteCartItem(gameId) {
      try {
        if (!token) {
          removeFromCart(gameId);
        } else {
          const response = await fetch(`${DELETE_CART_DETAIL}?gameId=${gameId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.status === 204) {
            setCart((prevCart) => {
              const updatedItems = prevCart.items.filter((item) => item.gameId !== gameId);
              const updatedCart = { items: updatedItems };
              updateLocalStorageCart(updatedCart);
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
        }
      } catch (error) {
        console.error('Error al realizar la solicitud DELETE:', error);
      }
    }

  // Cambiar la cantidad de un producto (añadir y decrementar) - 0 +
  const handleQuantityChange = (gameId, operation) => {
    gameId = Number(gameId);

    setCart((prevShoppingCart) => {
      const items = prevShoppingCart.items || []; 
      const updatedItems = [...items];

      const productIndex = updatedItems.findIndex((item) => item.gameId === gameId);
      const product = updatedItems[productIndex];

      if (!product && operation === "increase") {
        // Caso: carrito vacío o producto no existe
        const newItem = { gameId, quantity: 1 };
        const updatedCart = { items: [...updatedItems, newItem] };

        updateLocalStorageCart(updatedCart); 
        syncCartWithDB(updatedCart); 

        return updatedCart;
      }
      // El producto existe
      if (product) {
        let newQuantity = product.quantity;
        if (operation === "increase") {
          newQuantity += 1;
        } else if (operation === "decrease") {
          newQuantity = Math.max(newQuantity - 1, 0);
        }

        // Eliminar producto si la cantidad llega a 0
        if (newQuantity === 0) {
          updatedItems.splice(productIndex, 1);
          const updatedCart = { items: updatedItems };

          updateLocalStorageCart(updatedCart);
          syncCartWithDB(updatedCart);

          return updatedCart;
        } else { 
          updatedItems[productIndex] = { ...product, quantity: newQuantity };
          const updatedCart = { items: updatedItems };

          updateLocalStorageCart(updatedCart); 
          syncCartWithDB(updatedCart);

          return updatedCart;
        }
      }
      return prevShoppingCart;
    });
  };
  
  // Eliminar producto del carrito sin loguear
  const removeFromCart = (gameId) => {
    setCart((prevShoppingCart) => {
      const updatedItems = prevShoppingCart.items.filter((item) => item.gameId !== gameId);
      const updatedCart = { items: updatedItems };
      updateLocalStorageCart(updatedCart);
      return updatedCart;
    });
  };

  
  const ctxValue = {
    items: cart.items || [],
    gameDetails,
    handleQuantityChange,
    removeFromCart,
    fetchCartByGames,
    mergeCartWithDB,
    syncCartWithDB,
    getCartFromDB,
    deleteCartItem,
    refreshCart
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
