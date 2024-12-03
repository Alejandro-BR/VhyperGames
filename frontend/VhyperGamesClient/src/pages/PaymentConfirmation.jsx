import Footer from "../components/Footer/Footer";
import PaymentOrder from "../components/PaymentConfirmation/PaymentOrder";
import ConfirmationMsg from "../components/PaymentConfirmation/ConfirmationMsg";
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