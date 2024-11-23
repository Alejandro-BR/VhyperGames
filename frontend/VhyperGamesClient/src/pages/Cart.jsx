import CartListGames from "../components/cartViewComponent/CartListGames";
import CartPayment from "../components/cartViewComponent/CartPayment";
import classes from "../styles/Cart.module.css";
import Footer from "../components/footerComponent/Footer"

function Cart() {
  return (
    <div>
      <div className="generalContainer">
        <div className={classes.containerCartList}>
          <div className={classes.cartListGames}>
            <CartListGames />
          </div>
          <div className={classes.cartPayment}>
            <CartPayment />
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Cart;
