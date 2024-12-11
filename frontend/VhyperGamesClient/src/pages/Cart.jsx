import { useState, useEffect } from 'react';
import CartListGames from "../components/Cart/CartListGames";
import CartPayment from "../components/Cart/CartPayment";
import Footer from "../components/Footer/Footer";
import { getVarLS } from "../utils/keep";
import classes from "../styles/Cart.module.css";

function Cart() {

  const clave = "cart";
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    const checkCartStatus = () => {
      const storedCart = getVarLS(clave); 
      const isEmpty = !storedCart || !storedCart.items || storedCart.items.length === 0;
      setIsCartEmpty(isEmpty); 
    };

    checkCartStatus();

    const interval = setInterval(checkCartStatus, 500); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      <div className="generalContainer">
        {isCartEmpty ? (
          <div className={classes.emptyCartContainer}>
            <h1 className={classes.emptyCartMessage}>Ahora mismo no tienes nada en tu carrito</h1>
            <img src="/gif/Helpy.gif" alt="cart gif" className={classes.emptyCartGif} />
          </div>
        ) : (
          <div className={classes.containerCartList}>
            <div className={classes.cartListGames}>
              <CartListGames />
            </div>
            <div className={classes.cartPayment}>
              <CartPayment />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
