import Footer from "../components/Footer/Footer";
import { useParams} from "react-router-dom";
import CheckoutForm from "../components/Stripe/StripeForm";
import classes from "../styles/Checkout.module.css"
import CheckoutList from "../components/Checkout/CheckoutList";
import Timer from "../components/Timers/Timer";
import Ethereum from "../components/Ethereum/Ethereum";

function Checkout() {
  const params = useParams();
  const route = "/cart";
  const time = 180000; 

  return (
    <div className={classes["checkout"]}>
      <div className={classes["checkout__components"]}>
        <div className={classes["checkout__list"]}>
          <Timer route={route} time={time}/>
          <CheckoutList/>
        </div>
        <div className={classes["checkout__pay"]}>
          {params.modo === "euros" ? <CheckoutForm /> : <Ethereum/>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
