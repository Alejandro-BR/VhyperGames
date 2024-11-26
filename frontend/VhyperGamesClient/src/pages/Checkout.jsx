import Footer from "../components/footerComponent/Footer";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/stripe/CheckoutForm";

function Checkout() {
  const params = useParams();

  return (
    <div>
      <div>
        <div>
          Lista de juegos
        </div>
        <div>
          {params.modo === "euros" ? <CheckoutForm /> : <p>hola</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
