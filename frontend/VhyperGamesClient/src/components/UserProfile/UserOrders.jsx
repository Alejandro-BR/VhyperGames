import { useState, useEffect } from "react";
import { getUserOrders } from "../../endpoints/OrderEndpoints";
import { ORDER_BY_USER } from "../../config";
import { useAuth } from "../../context/AuthContext";
import classes from "./UserOrders.module.css"
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config";

function UserOrders() {
    const {token} = useAuth(); 
    const [orders, setOrders] = useState([]); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 


    const paymentModes = {
        0: "Ethereum",
        1: "Tarjeta de crédito",
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getUserOrders(ORDER_BY_USER, token);
                setOrders(data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]); 

    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((orderData) => (
                        <>
                            <div key={orderData.id}></div>
                            <div className={classes.container}>
                                <div className={classes.order}>
                                    <p>Pedido Nº {orderData.id}</p>
                                    <p>Fecha de facturación: {new Date(orderData.billingDate).toLocaleDateString()}</p>
                                    <hr className={classes.line} />
                                </div>

                                <div className={classes.gameList}>
                                    {orderData.orderGames?.map((game) => (
                                        <div key={game.gameId} className={classes.gameItem}>
                                            <Link to={`/juego/${game.gameId}`}>
                                                <div className={classes.gameListImg}>
                                                    <img
                                                        src={`${BASE_URL}${game.imageGame.imageUrl}`}
                                                        alt={game.imageGame.altText}
                                                        className={classes.listImg}
                                                    />
                                                </div>
                                            </Link>
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
                        </>


                    ))}
                </ul>
            ) : (
                <p>No has realizado ningun pedido todavia.</p>
            )}
        </div>
    );
}

export default UserOrders;
