import Footer from "../components/footerComponent/Footer";
import PaymentOrder from "../components/PaymentConfirmationComponent/PaymentOrder";
import Title from "../components/titleComponent/Title";


function PaymentConfirmation() {
    return (
        <div>
            <div className="generalContainer">
                <Title text="PAGO REALIZADO" size="3em" color="#fff" align="center" />
            </div>
            <div className="orderPayment">
                <PaymentOrder />
            </div>
            <Footer />
        </div>
    )
}

export default PaymentConfirmation;