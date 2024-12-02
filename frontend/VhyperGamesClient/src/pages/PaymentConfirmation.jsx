import Footer from "../components/footerComponent/Footer";
import PaymentOrder from "../components/PaymentConfirmationComponent/PaymentOrder";
import ConfirmationMsg from "../components/PaymentConfirmationComponent/ConfirmationMsg";
import classes from "../styles/PaymentConfirmation.module.css"


function PaymentConfirmation() {
  return (
    <>
      <div className={classes.paymentConfirmation}>
        <div className={classes.generalContainer}>
          <ConfirmationMsg />
        </div>
        <div className={classes.paymentOrder}>
          <PaymentOrder />
        </div>
      </div>
      <Footer />
    </>

  )
}

export default PaymentConfirmation;