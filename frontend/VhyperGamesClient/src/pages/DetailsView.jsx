import Footer from "../components/footerComponent/Footer";
import GameData from "../components/detailsViewComponents/gameDataComponent/GameData";
import GamePrice from "../components/detailsViewComponents/gamePriceComponent/GamePrice"
import classes from "../styles/DetailsView.module.css";
import { useParams } from "react-router-dom";
import GameRequeriments from "../components/detailsViewComponents/gameRequirements/GameRequirements";

function ViewDetails() {

  const params = useParams();

  return (
    <>
      <div className={`${classes["view-details"]} generalContainer`}>
        <div
          className={`${classes["view-details__main-section"]} ${classes.box}`}
        >
          <GameData id={params.gameId} />
        </div>
        <div className={`${classes["view-details__price-newreview"]} ${classes.box}`}>
          <GamePrice id={params.gameId}/>
        </div>
        <div className={`${classes["view-details__system-requirements"]} ${classes.box}`}>
          <GameRequeriments id={params.gameId}/>
        </div>
        <div className={`${classes["view-details__reviews"]} ${classes.box}`}>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewDetails;
