import Footer from "../components/footerComponent/Footer";
import GameData from "../components/viewDetailsComponent/gameDataComponent/GameData";
import classes from "../styles/ViewDetails.module.css";

function ViewDetails() {
  return (
    <>
      <div className={classes["view-details"]}>
        <div className={`${classes["view-details__main-section"]} ${classes.box}`}>
          <GameData />
        </div>
        <div className={`${classes["view-details__price-newreview"]} ${classes.box}`}>
          
        </div>
        <div className={`${classes["view-details__system-requirements"]} ${classes.box}`}>

        </div>
        <div className={`${classes["view-details__reviews"]} ${classes.box}`}>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewDetails;
