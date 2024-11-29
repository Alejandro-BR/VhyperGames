import React, { useEffect, useState, useContext } from "react";
import classes from "./ConfirmationMsg.module.css";
import { useAuth } from "../../context/authcontext";
import { CartContext } from "../../context/CartContext";
import { CheckoutContext } from "../../context/CheckoutContext";
import { orderById } from "../../helpers/orderHelper";
import { ORDER_BY_ID } from "../../config";
import Title from "../titleComponent/Title";

function ConfirmationMsg() {
  const { token } = useAuth();
  const { orderId } = useContext(CheckoutContext);
  const [status, setStatus] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const { refreshCart } = useContext(CartContext);

  // Fetch data on component mount
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!token || !orderId) {
        setStatus("failure");
        return;
      }

      try {
        const data = await orderById(ORDER_BY_ID, orderId, token);
        setOrderData(data);
        setStatus("success");
      } catch (err) {
        console.error("Error al obtener los datos del pedido:", err.message);
        setStatus("failure");
        setError(err.message);
      }
    };

    fetchOrderData();
  }, [token, orderId]);

  //useEffect(() => {
  //  refreshCart();
  //  console.log("refreshCart");
  //}, [refreshCart]);

  // Redirect timer if payment fails
  useEffect(() => {
    if (status === "failure") {
      const timer = setTimeout(() => {
        //window.location.href = "/cart";
      }, 3000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [status]);

  // Render content based on status
  if (status === "success" && orderData) {
    return (
      <div className={classes.msg}>
        <Title text="PAGO REALIZADO" size="3em" color="#fff" align="center" variant="paymentSuccessful" />
        <img className={classes.gif} src="/gif/hollow-knight.gif" alt="Hollow knight haciendo un baile mamalón" />
      </div>
    );
  } else if (status === "failure") {
    return (
      <div className={classes.msg}>
        <Title text="Algo salió mal en el pago :(" size="3em" color="#fff" align="center" />
        <p>Te estamos redirigiendo al carrito...</p>
      </div>
    );
  } else {
    return <p>Cargando estado del pago...</p>;
  }
}

export default ConfirmationMsg;
