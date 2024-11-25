import React from "react";
import classes from "./PaymentOrder.module.css";

const orderData = {
  id: 3584755,
  billingDate: "2024-10-10",
  orderGames: [
    {
      id: 1,
      orderId: 3584755,
      gameId: 101,
      gameName: "The Witcher III",
      price: 9.99,
      quantity: 1,
    },
    {
      id: 2,
      orderId: 3584755,
      gameId: 102,
      gameName: "Minecraft",
      price: 20.0,
      quantity: 1,
    },
    {
      id: 3,
      orderId: 3584755,
      gameId: 103,
      gameName: "Stardew Valley",
      price: 14.99,
      quantity: 1,
    },
  ],
  modeOfPay: "Ethereum",
  totalPrice: 48.98,
};

function PaymentOrder() {
  return (
    <div className={classes.container}>
      <div className="order">
          <p>Pedido Nº {orderData.id}</p>
          <p>Fecha de facturación: {orderData.billingDate}</p>
      </div>

      <div className={classes.gameList}>
        {orderData.orderGames.map((game) => (
          <div key={game.id} className="gameItem">
            <div className={classes.gameListImg}>
              <img src={"/img/witcher3.png"} alt={game.gameName} className={classes.listImg}/>
            </div>
            <div className="gameList-data">
              <p>{game.gameName}</p>
              <p>{game.price} €</p>
              <p>Cantidad: {game.quantity}</p>
            </div>
          </div>
        ))}

        <div className="payment">
          <p>Pagado con: {orderData.modeOfPay}</p>
          <p>Total pagado: {orderData.totalPrice}€</p>
        </div>
      </div>

    </div>
  );
}

export default PaymentOrder;
