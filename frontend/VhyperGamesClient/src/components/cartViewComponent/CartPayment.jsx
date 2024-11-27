import React, { useContext, useState, useEffect } from 'react';
import { CreateData } from '../../utils/dataCart';
import { ConvertToDecimal, TotalPrice } from '../../utils/price';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import { CheckoutContext } from '../../context/CheckoutContext';
import Button from '../buttonComponent/Button';
import LoginModal from '../loginComponents/LoginModal'; // Importar el modal de login
import classes from './CartPayment.module.css';
import { useAuth } from '../../context/AuthContext';


function CartPayment() {
  const { gameDetails, items } = useContext(CartContext);
  const { handleCreateReserve } = useContext(CheckoutContext); 
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [paymentRoute, setPaymentRoute] = useState("");
  const [paymentMode, setPaymentMode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedData = CreateData(items, gameDetails);
    setData(updatedData);
  }, [gameDetails, items]);

  const handlePaymentClick = async (useLocalReserve, modeOfPay, route) => {
    if (!token) {
      setIsLoginModalOpen(true); 
      setIsPaymentInitiated(true); 
      setPaymentRoute(route); 
      setPaymentMode(modeOfPay);
      return;
    }

    try {
      const reserveId = await handleCreateReserve(modeOfPay, useLocalReserve, route);
      if (!reserveId) {
        console.error("No se pudo crear la reserva.");
        return;
      }

      console.log("Reserva creada exitosamente, redirigiendo...");
      navigate(route); // Redirigir a la página de pago
    } catch (error) {
      console.error("Error en handlePaymentClick:", error);
    }
  };

  // Callback cuando el usuario se loguea correctamente desde el modal
  const handleLoginSuccess = async () => {
    console.log("onSuccess llamado correctamente. Ejecutando handleLoginSuccess...");
    setIsLoginModalOpen(false);

    if (isPaymentInitiated) {
        try {
          console.log("Esperando que el token esté disponible...");
          await new Promise(resolve => setTimeout(resolve, 500)); // Pequeño retardo

            // Recuperar el token directamente de localStorage
            const storedToken = sessionStorage.getItem("accessToken");
            console.log("Token sincronizado desde localStorage:", storedToken);

            if (!storedToken) {
                console.error("Token aún no está disponible. Abortando reserva.");
                return;
            }

            const reserveId = await handleCreateReserve(paymentMode, true);
            if (!reserveId) {
                console.error("No se pudo crear la reserva después del login.");
                return;
            }

            console.log("Reserva creada después del login, redirigiendo...");
            navigate(paymentRoute); // Usa paymentRoute del estado
        } catch (error) {
            console.error("Error al crear la reserva después del login:", error);
        } finally {
            setIsPaymentInitiated(false); // Resetea el estado
        }
    }
};


  

  const precio = ConvertToDecimal(TotalPrice(data));

  return (
    <div className={classes.cartPayment}>
      <div className={classes.cartPayment__containerTitle}>
        <p className={classes.cartPayment__palito}>&#10073;</p>
        <p className={classes.cartPayment__title}>Carrito</p>
      </div>
      <p className={classes.cartPayment__total}>TOTAL</p>
      <div className={classes.cartPayment__price}>
        <p>{precio} €</p>
      </div>
      <hr className={classes.cartPayment__line} />
      <div className={classes.cartPayment__containerButtons}>
        <Button
          variant={"medium"}
          color={"morado-azul"}
          onClick={() => {
            handlePaymentClick(false, 1, "/checkout/euros");
          }}
        >
          PAGAR EN <br /> EUROS
        </Button>
        <Button
          variant={"medium"}
          color={"azul-morado"}
          onClick={() => {
            handlePaymentClick(false, 0, "/checkout/ethereum");
          }}
        >
          PAGAR EN ETHEREUM
        </Button>
      </div>
      {/* Modal para Login */}
      {isLoginModalOpen && (
        <LoginModal onClose={() => 
          setIsLoginModalOpen(false)}
          onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default CartPayment;