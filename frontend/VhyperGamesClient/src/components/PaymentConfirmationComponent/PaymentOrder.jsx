import React, { useEffect, useState } from "react";
import classes from "./PaymentOrder.module.css";
import { createReserve } from "../../helpers/orderHelper"; 

function PaymentOrder({ apiUrl, authToken }) {
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await createReserve(apiUrl, authToken);
        setOrderData(data); // Almacena los datos obtenidos
      } catch (err) {
        setError(err.message); // Almacena el error en caso de fallo
      }
    };

    fetchOrder();
  }, [apiUrl, authToken]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!orderData) {
    return <p>Cargando datos de la reserva...</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.order}>
        <p>Pedido Nº {orderData.id}</p>
        <p>Fecha de facturación: {new Date(orderData.billingDate).toLocaleDateString()}</p>
        <hr className={classes.line} />
      </div>

      <div className={classes.gameList}>
        {orderData.orderGames.map((game) => (
          <div key={game.gameId} className={classes.gameItem}>
            <div className={classes.gameListImg}>
              <img
                src={game.imageGame.imageUrl}
                alt={game.imageGame.altText}
                className={classes.listImg}
              />
            </div>
            <div className={classes.gameListData}>
              <p>{game.title}</p>
              <p>{(game.price / 100).toFixed(2)} €</p>
              <p>Cantidad: {game.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.payment}>
        <hr className={classes.line} />
        <p>Pagado con: {orderData.modeOfPay}</p>
        <p>Total pagado: {(orderData.totalPrice / 100).toFixed(2)} €</p>
      </div>
    </div>
  );
}

export default PaymentOrder;
