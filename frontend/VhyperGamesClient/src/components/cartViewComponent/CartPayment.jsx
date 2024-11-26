import React, { useContext, useState, useEffect } from 'react';
import { CreateData } from '../../utils/dataCart';
import { ConvertToDecimal, TotalPrice } from '../../utils/price';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import { CheckoutContext } from '../../context/CheckoutContext';
import Button from '../buttonComponent/Button';
import LoginModal from '../loginComponents/LoginModal'; // Importar el modal de login
import classes from './CartPayment.module.css';
import { useAuth } from '../../context/authcontext';


function CartPayment() {
  const { gameDetails, items } = useContext(CartContext);
  const { handleCreateReserve } = useContext(CheckoutContext); // Supongo que el token viene del contexto
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  useEffect(() => {
    const updatedData = CreateData(items, gameDetails);
    setData(updatedData);
  }, [gameDetails, items]);

  const handleClick = async (modeOfPay, route) => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      await handleCreateReserve(modeOfPay);
      navigate(route);
    } catch (error) {
      console.error("Error en handleClick:", error);
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
            handleClick(1, "/checkout/euros");
          }}
        >
          PAGAR EN <br /> EUROS
        </Button>
        <Button
          variant={"medium"}
          color={"azul-morado"}
          onClick={() => {
            handleClick(0, "/checkout/ethereum");
          }}
        >
          PAGAR EN ETHEREUM
        </Button>
      </div>
      {/* Modal para Login */}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
}

export default CartPayment;