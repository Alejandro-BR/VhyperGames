import React, { useEffect, useState } from "react";
import classes from "./PaymentOrder.module.css";
import { recentOrder } from "../../helpers/orderHelper";
import { useAuth } from "../../context/authcontext";
import { BASE_URL, MOST_RECENT_ORDER } from "../../config";

const paymentModes = {
  0: "Ethereum",
  1: "Tarjeta de crédito",
};

function PaymentOrder() {
  const { token } = useAuth(); 
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.log("Token no disponible todavía, esperando...");
      return;
    }

    const fetchOrder = async () => {
      console.log("Token utilizado:", token); 

      try {
        const data = await recentOrder(MOST_RECENT_ORDER, token); 
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrder();
  }, [token]);

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
        {Array.isArray(orderData.orderGames) &&
          orderData.orderGames.map((game) => (
            <div key={game.gameId} className={classes.gameItem}>
              <div className={classes.gameListImg}>
                <img
                  src={`${BASE_URL}${game.imageGame.imageUrl}`}
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
        <p>Pagado con: {paymentModes[orderData.modeOfPay]}</p>
        <p>Total pagado: {(orderData.totalPrice / 100).toFixed(2)} €</p>
      </div>
    </div>
  );
}

export default PaymentOrder;
