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
    const fetchReserveDetails = async () => {
      if (reserveId) {
        const fetchUrl = GET_RESERVE_DETAILS;
        await loadReserveDetails(fetchUrl, reserveId);
      }
    };

    fetchReserveDetails();
  }, [reserveId, loadReserveDetails]); 


  useEffect(() => {
    if (Array.isArray(reserve) && JSON.stringify(reserve) !== JSON.stringify(reserveDetails)) {
      setReserveDetails(reserve);
    }
  }, [reserve, reserveDetails]);


  return (
    <section className={classes.gamesList}>
      {Array.isArray(reserveDetails) && reserveDetails.length > 0 ? (
        reserveDetails.map((cartItem) => (
          <div key={cartItem.gameId} className={classes.container}>
            <article className={classes.gameCard}>
              <div className={classes.gameCard__left}>
                <img
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