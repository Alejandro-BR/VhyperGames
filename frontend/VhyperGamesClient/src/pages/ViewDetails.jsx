import Footer from "../components/footerComponent/Footer";
import classes from "../styles/ViewDetails.module.css";

function ViewDetails() {
  return (
    <>
      <div className={classes.container}>
        <div className={`${classes["main-section"]} ${classes.box}`}>

        </div>
        <div className={`${classes["price-newreview"]} ${classes.box}`}>
          
        </div>
        <div className={`${classes["system-requirements"]} ${classes.box}`}>

        </div>
        <div className={`${classes["reviews"]} ${classes.box}`}>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewDetails;
