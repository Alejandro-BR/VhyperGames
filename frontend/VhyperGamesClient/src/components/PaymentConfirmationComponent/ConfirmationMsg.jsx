import React, { useEffect, useState, useContext } from "react";
import classes from "./ConfirmationMsg.module.css";
import { useAuth } from "../../context/authcontext";
import { CheckoutContext } from "../../context/CheckoutContext";
import { orderById } from "../../helpers/orderHelper";
import { ORDER_BY_ID } from "../../config";
import Title from "../titleComponent/Title";

// No sé si la lógica debe ir aquí o solamente recoger status, pero al colega le parece bien de esta forma

function ConfirmationMsg(
    // aquí podríamos meter un string como parámetro para emtérselo a status(?)
) {
    const { token } = useAuth();
    const { orderId } = useContext(CheckoutContext);
    const [status, setStatus] = useState("");
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);

    // Este useEffect creo que no hace falta, iría en la lista
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

    if (status === "success" && orderData) {
        return (
            <div className={classes.msg}>
                <Title text="PAGO REALIZADO" size="3em" color="#fff" align="center" variant="paymentSuccessful" />
                <img className={classes.gif} src="/gif/hollow-knight.gif" alt="Hollow knight haciendo un baile mamalón" />
            </div>
            // <div className={classes.msg}>
            //     <h2>¡Pago confirmado!</h2>
            //     <p>Pedido Nº: {orderData.id}</p>
            //     <p>Fecha: {new Date(orderData.billingDate).toLocaleDateString()}</p>
            //     <p>Total pagado: {(orderData.totalPrice / 100).toFixed(2)} €</p>
            //     <p>Pagado con: {orderData.modeOfPay === 0 ? "Ethereum" : "Tarjeta de crédito"}</p>
            //     <hr />
            //     <div>
            //         {Array.isArray(orderData.orderGames) &&
            //             orderData.orderGames.map((game) => (
            //                 <div key={game.gameId}>
            //                     <p>Juego: {game.title}</p>
            //                     <p>Precio: {(game.price / 100).toFixed(2)} €</p>
            //                     <p>Cantidad: {game.quantity}</p>
            //                 </div>
            //             ))}
            //     </div>
            // </div>
        );
    } else if (status === "failure") {
        // Mostrar mensaje de error y redirigir al carrito
        useEffect(() => {
            const timer = setTimeout(() => {
                window.location.href = "/cart"; // Redirige al carrito después de unos segundos
            }, 3000);

            return () => clearTimeout(timer); // Limpieza del temporizador
        }, []);

        return (
            <div className={classes.msg}>
                <Title text="Algo salió mal en el pago :(" size="3em" color="#fff" align="center" />
                <p>Te estamos redirigiendo al carrito...</p>
            </div>
        );
    } else {
        // Mientras se cargan los datos o el estado
        return <p>Cargando estado del pago...</p>;
    }
}

export default ConfirmationMsg;
