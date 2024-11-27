import { useContext, useEffect } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { ConvertToDecimal } from '../../utils/price';
import { BASE_URL } from '../../config';
import { getVarLS } from '../../utils/keep';
import classes from './CheckoutList.module.css';

function CheckoutList() {
  const { reserve } = useContext(CheckoutContext); // Usa la reserva proporcionada por el contexto
  const clave = 'cart';
  const storedCart = getVarLS(clave) || { items: [] }; // Carrito desde localStorage como respaldo

  // La lista de juegos viene del carrito almacenado
  const cartItems = reserve.items.length > 0 ? reserve.items : storedCart.items;

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      console.log('El carrito está vacío.');
    }
  }, [cartItems]);

  console.log(cartItems);
  return (
    <section className={classes.gamesList}>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => ( 
          <div key={cartItem.gameId} className={classes.container}>
            <article className={classes.gameCard}>
              <div className={classes.gameCard__left}>
                <img
                  src={`${BASE_URL}${cartItem.imageUrl}`}
                  alt={cartItem.altText || 'Imagen del juego'}
                />
              </div>
              <div className={classes.gameCard__right}>
                <p>{cartItem.title}</p>
                <p>
                  Precio total:{' '}
                  {ConvertToDecimal(cartItem.price * cartItem.quantity)} €
                </p>
                <p>Cantidad: {cartItem.quantity}</p>
              </div>
            </article>
            <hr className={classes.gameCard__line} />
          </div>
        ))
      ) : (
        <p className={classes.emptyMessage}>Tu carrito está vacío.</p>
      )}
    </section>
  );
}

export default CheckoutList;
