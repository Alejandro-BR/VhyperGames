import { useContext, useEffect, useState } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { ConvertToDecimal } from '../../utils/price';
import { BASE_URL } from '../../config';
import classes from './CheckoutList.module.css';
import { GET_RESERVE_DETAILS } from '../../config';

function CheckoutList() {
  const { reserve, reserveId, loadReserveDetails } = useContext(CheckoutContext);
  const [reserveDetails, setReserveDetails] = useState([]);


  useEffect(() => {
    if (!reserveId) {
      console.log("Skipping fetchReserveDetails as reserveId is null or undefined.");
      return;
    }

    const fetchReserveDetails = async () => {
      try {
        const details = await loadReserveDetails(GET_RESERVE_DETAILS, reserveId); 
        if (details) {
          setReserveDetails(details); 
        }
      } catch (error) {
        console.error("Error fetching reserve details:", error);
      }
    };

    const delay = 500;
    const timeout = setTimeout(() => {
      fetchReserveDetails();
    }, delay);

    return () => clearTimeout(timeout);
  }, [reserveId, loadReserveDetails]);


  return (
    <section className={classes.gamesList}>
      {Array.isArray(reserveDetails) && reserveDetails.length > 0 ? (
        reserveDetails.map((cartItem) => (
          <div key={cartItem.gameId} className={classes.container}>
            <article className={classes.gameCard}>
              <div className={classes.gameCard__left}>
                <img
                  className={classes.gameCard__img}
                  src={`${BASE_URL}${cartItem.imageGame.imageUrl}`}
                  alt={cartItem.imageGame.altText || 'Imagen del juego'}
                />
              </div>
              <div className={classes.gameCard__right}>
                <p>{cartItem.title}</p>
                <p>
                  Precio total:{' '}
                  {ConvertToDecimal(cartItem.price)} €
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