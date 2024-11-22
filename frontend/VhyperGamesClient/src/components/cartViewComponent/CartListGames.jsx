import { useContext, useEffect } from 'react';
import { CartContext } from "../../context/CartContext";
import { ConvertToDecimal } from "../../utils/price";
import { BASE_URL } from "../../config";
import { getVarLS } from '../../utils/keep';
import QuantityButton from "../quantityButtonComponents/QuantityButton";
import classes from "./CartListGames.module.css";

const CartListGames = () => {
  const { gameDetails, fetchCartByGames, items } = useContext(CartContext);
  const clave = "cart";
  const storedCart = getVarLS(clave) || { items: [] };

  useEffect(() => {
    if (storedCart && Array.isArray(storedCart.items)) { 
      const gameIds = storedCart.items.map((item) => item.gameId);
      if (gameIds.length > 0) {
        fetchCartByGames(gameIds);
      }
    }
  }, [fetchCartByGames, items]);

  return (
    <section className={classes.gamesList}>
      {gameDetails
        .filter((game) => {
          const cartItem = storedCart.items.find((item) => item.gameId === game.idGame);
          return cartItem && cartItem.quantity > 0; 
        })
        .map((game) => {
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
