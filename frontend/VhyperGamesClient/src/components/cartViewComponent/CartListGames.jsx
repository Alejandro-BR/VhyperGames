import { useContext, useEffect } from 'react';
import { CartContext } from "../../context/CartContext";
import classes from "./CartListGames.module.css";
import { ConvertToDecimal } from "../../utils/price";
import { BASE_URL } from "../../config";
import QuantityButton from "../quantityButtonComponents/QuantityButton";

const CartListGames = () => {
  const { gameDetails, fetchCartByGames, items } = useContext(CartContext);

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
  }, [fetchCartByGames, items]);

  // Combinar cantidades de los juegos basados en su ID
  // const gamesWithQuantity = gameDetails.map((game) => {
  //   const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
  //   const cartItem = storedCart.items.find(item => item.gameId === game.idGame);
  //   return {
  //     ...game,
  //     quantity: cartItem ? cartItem.quantity : 1, // Asigna la cantidad del carrito
  //   };
  // });

  return (
    <section className={classes.gamesList}>
      {gameDetails
        .filter((game) => {
          const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
          const cartItem = storedCart.items.find((item) => item.gameId === game.idGame);
          return cartItem && cartItem.quantity > 0; // Filtrar solo juegos con cantidad > 0
        })
        .map((game) => {
          const storedCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
          const cartItem = storedCart.items.find((item) => item.gameId === game.idGame);
          const quantity = cartItem ? cartItem.quantity : 0;
  
          return (
            <article key={game.idGame} className={classes.gameCard}>
              <div className={classes.gameCard__left}>
                <img src={`${BASE_URL}${game.imageGame.imageUrl}`} alt={game.imageGame.altText} />
              </div>
              <div className={classes.gameCard__right_top}>
                <p>{game.title}</p>
                <p>{(ConvertToDecimal(game.price))} €</p>
              </div>
              <div className={classes.gameCard__right_bottom}>
                <p>Cantidad: {quantity}</p>
                <QuantityButton id={game.idGame} stock={game.stock} bin={true} />
              </div>
              <hr className={classes.gameCard__line} />
            </article>
          );
        })}
    </section>
  );
};

export default CartListGames;
