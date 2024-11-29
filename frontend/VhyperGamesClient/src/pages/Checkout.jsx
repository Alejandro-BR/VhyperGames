import Footer from "../components/footerComponent/Footer";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/stripe/CheckoutForm";
import classes from "../styles/checkout.module.css"
import CheckoutList from "../components/CheckoutComponent/CheckoutList";
import { useEffect } from "react";

function Checkout() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cart")
    }, 180000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={classes["checkout"]}>
      <div className={classes["checkout__components"]}>
        <div className={classes["checkout__list"]}>
          <CheckoutList/>
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
