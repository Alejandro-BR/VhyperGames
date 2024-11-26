import { useContext, useState, useEffect } from 'react';
import { messageEuros, messageEthereum } from '../../helpers/messages';
import { CreateData } from '../../utils/dataCart';
import { ConvertToDecimal, TotalPrice } from '../../utils/price';
// import { getVarLS } from '../../utils/keep';
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import Button from '../buttonComponent/Button';
import classes from './CartPayment.module.css';
import { useCheckoutCxt } from '../../context/CheckoutContext';
import { setReserve } from '../../helpers/reserveHelper';

function CartPayment() {
  const { gameDetails, items } = useContext(CartContext);
  const { setModeOfPay } = useCheckoutCxt;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedData = CreateData(items, gameDetails);
    setData(updatedData);
  }, [gameDetails, items]);

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
            navigate("/checkout/euros");
            setModeOfPay(1);
            setReserve;
          }}
        >
          PAGAR EN <br /> EUROS
        </Button>
        <Button
          variant={"medium"}
          color={"azul-morado"}
          onClick={() => {
            navigate("/checkout/ethereum");
            setModeOfPay(0);
            setReserve;
          }}
        >
          PAGAR EN ETHEREUM
        </Button>
      </div>
    </div>
  );
}

export default CartPayment;
