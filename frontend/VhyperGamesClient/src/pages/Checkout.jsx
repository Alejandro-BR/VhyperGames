import Footer from "../components/footerComponent/Footer";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/stripe/CheckoutForm";

function Checkout() {
  const params = useParams();

  return (
    <div>
      {params.modo === "euros" ? <CheckoutForm /> : <p>hola</p>}
      <div className="generalContainer">
        <p>Checkout con pago con {params.modo}</p>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
