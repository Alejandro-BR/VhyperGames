import React, { useEffect, useState, useContext } from "react";
import classes from "./PaymentOrder.module.css";
import { orderById } from "../../helpers/orderHelper";
import { useAuth } from "../../context/authcontext";
import { ORDER_BY_ID, BASE_URL } from "../../config";
import { CheckoutContext } from "../../context/CheckoutContext";

const paymentModes = {
  0: "Ethereum",
  1: "Tarjeta de crédito",
};

function PaymentOrder() {
  const { token } = useAuth();
  const { orderId } = useContext(CheckoutContext);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (orderId) localStorage.setItem("orderId", orderId);

    const fetchOrder = async () => {
      try {
        const data = await orderById(ORDER_BY_ID, orderId, token);
        setOrderData(data);
      } catch (error) {
      }
    };
    fetchOrder();
  }, [token, orderId]);

  if (!orderData) return <p>No hay ningun pedido.</p>;

  return (
    <div className={classes.container}>
      <div className={classes.order}>
        <p>Pedido Nº {orderData.id}</p>
        <p>Fecha de facturación: {new Date(orderData.billingDate).toLocaleDateString()}</p>
        <hr className={classes.line} />
      </div>

      <div className={classes.gameList}>
        {orderData.orderGames?.map((game) => (
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
