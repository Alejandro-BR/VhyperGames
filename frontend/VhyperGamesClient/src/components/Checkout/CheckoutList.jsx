import { useContext, useEffect, useState } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { ConvertToDecimal } from '../../utils/price';
import { BASE_URL } from '../../config';
import classes from './CheckoutList.module.css';
import { GET_RESERVE_DETAILS } from '../../config';

function CheckoutList() {
  const { reserve, reserveId, loadReserveDetails, clearReserve } = useContext(CheckoutContext); // Agrega `clearReserve` desde el contexto
  const [reserveDetails, setReserveDetails] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchReserveDetails = async () => {
      console.log('fetchReserveDetails triggered');
      console.log('reserveId:', reserveId);
      console.log('isPaid:', isPaid);

      if (reserveId && !isPaid) {
        try {
          const fetchUrl = GET_RESERVE_DETAILS;
          console.log('Fetching reserve details from:', fetchUrl, 'with reserveId:', reserveId);
          await loadReserveDetails(fetchUrl, reserveId);
        } catch (error) {
          console.error('Error fetching reserve details:', error.message);

          if (error.message.includes('404')) {
            console.error('Reserva no encontrada. Es posible que haya sido eliminada o pagada.');
            setIsPaid(true); // Marcar como pagada
            clearReserve(); // Limpia la reserva del contexto
          }
        }
      }
    };

    fetchReserveDetails();
  }, [reserveId, loadReserveDetails, isPaid, clearReserve]);

  useEffect(() => {
    console.log('Checking if reserve and reserveDetails are different');
    console.log('Current reserve:', reserve);
    console.log('Current reserveDetails:', reserveDetails);

    if (Array.isArray(reserve) && reserve.length > 0) {
      setReserveDetails(reserve);
    }
  }, [reserve, reserveDetails]);

  useEffect(() => {
    console.log('reserveId changed:', reserveId);
    if (reserveId) {
      console.log('Resetting isPaid to false');
      setIsPaid(false);
    }
  }, [reserveId]);

  return (
    <section className={classes.gamesList}>
      {isPaid ? (
        <p className={classes.emptyMessage}>La reserva ha sido pagada. Gracias por tu compra.</p>
      ) : Array.isArray(reserveDetails) && reserveDetails.length > 0 ? (
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
                  Precio total: {ConvertToDecimal(cartItem.price)} €
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
