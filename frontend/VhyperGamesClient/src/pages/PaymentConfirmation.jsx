import Footer from "../components/Footer/Footer";
import PaymentOrder from "../components/PaymentConfirmation/PaymentOrder";
import ConfirmationMsg from "../components/PaymentConfirmation/ConfirmationMsg";
import classes from "../styles/PaymentConfirmation.module.css"
import { useEffect } from "react";
import { deleteLocalStorage } from "../utils/keep"


function PaymentConfirmation() {

  useEffect(() => {
    return () => {
      deleteLocalStorage("orderId");
      deleteLocalStorage("equivalentEthereum");
    };
  }, []);
  
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