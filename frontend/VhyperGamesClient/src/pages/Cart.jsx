import CartListGames from "../components/cartViewComponent/CartListGames";
import CartPayment from "../components/cartViewComponent/CartPayment";
import Footer from "../components/footerComponent/Footer";
import { getVarLS } from "../utils/keep";
import classes from "../styles/Cart.module.css";

function Cart() {
  const clave = "cart";
  const storedCart = getVarLS(clave) || { items: [] };

  return (
    <div>
      <div className="generalContainer">
        {storedCart.items.length === 0 || storedCart === null ? (
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
