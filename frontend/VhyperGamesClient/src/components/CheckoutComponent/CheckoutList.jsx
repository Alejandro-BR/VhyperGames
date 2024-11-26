import { useContext, useEffect } from 'react';
import { CartContext } from "../../context/CartContext";
import { ConvertToDecimal } from "../../utils/price";
import { BASE_URL } from "../../config";
import { getVarLS } from '../../utils/keep';
import classes from "./CheckoutList.module.css"

function CheckoutList() {
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
            <div className={classes.container}>
            <article key={game.idGame} className={classes.gameCard}>
              <div className={classes.gameCard__left}>
                <img src={`${BASE_URL}${game.imageGame.imageUrl}`} alt={game.imageGame.altText} />
              </div>

              <div className={classes.gameCard__right}>
                <p>{game.title}</p>
                <p>Precio total: {(ConvertToDecimal(game.price * quantity))} €</p>
                <p>Cantidad: {quantity}</p>
              </div>

            </article>
            <hr className={classes.gameCard__line} />
            </div>
            
          );
        })}
    </section>
  )
}

export default CheckoutList