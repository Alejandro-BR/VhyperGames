import React, { useContext, useEffect } from 'react';
import { CartContext } from "../../context/CartContext";
import classes from "./CartListGames.module.css";

const CartListGames = () => {
  const { gameDetails, fetchCartByGames, handleQuantityChange } = useContext(CartContext);

  // Ejecutar fetchCartByGames al montar el componente
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      const gameIds = cart.items.map(item => item.gameId);
      if (gameIds.length > 0) {
        fetchCartByGames(gameIds);
      }
    }
  }, [fetchCartByGames]);

  // Combinar cantidades de los juegos basados en su ID
  const gamesWithQuantity = gameDetails.map((game) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    const cartItem = storedCart.items.find(item => item.gameId === game.idGame);
    return {
      ...game,
      quantity: cartItem ? cartItem.quantity : 1, // Asigna la cantidad del carrito
    };
  });

  return (
    <>
      {gamesWithQuantity.map((game) => (
        <div key={game.idGame} className={classes.container}>
          <div className={classes.container__left}>
            <img src={game.imageGame?.imageUrl} alt={game.title || "Game Image"} />  {/*LA IMAGEN NO LA PILLA, REVISAR BACK . EN CONSOLE LOG ESTA PETICION SE LLAMA DATOS OBTENIDOS DE LA API*/}
          </div>
          <div className={classes.container__right}>
            <div className={classes.container__right_top}>
              <p>{game.title}</p>
              <p>€{(game.price / 100).toFixed(2)}</p>
              <p>Cantidad: {game.quantity}</p>
            </div>
            <div className={classes.container__right_bottom}>
              <button onClick={() => handleQuantityChange(game.idGame, "decrease")}>-</button>
              <span>{game.quantity}</span>
              <button onClick={() => handleQuantityChange(game.idGame, "increase")}>+</button>
            </div>
          </div>
          <hr className={classes.cartPayment__line} />
        </div>
      ))}
    </>
  );
};

export default CartListGames;
