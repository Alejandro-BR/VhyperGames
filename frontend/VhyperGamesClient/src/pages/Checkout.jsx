import Footer from "../components/footerComponent/Footer";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/stripe/CheckoutForm";
import classes from "../styles/checkout.module.css"

function Checkout() {
  const params = useParams();

  return (
    <div className={classes["checkout"]}>
      <div className={classes["checkout__components"]}>
        <div className={classes["checkout__list"]}>
          Lista de juegos
        </div>
        <div className={classes["checkout__pay"]}>
          {params.modo === "euros" ? <CheckoutForm /> : <p>hola</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
