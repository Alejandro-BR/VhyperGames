import Footer from "../components/footerComponent/Footer";
import { useParams } from "react-router-dom";

function Checkout() {
  const params = useParams();

  return (
    <div>
      <div className="generalContainer">
        <p>Checkout con pago con {params.modo}</p>
      </div>
      <Footer />
    </div>
  )
}

export default Checkout;