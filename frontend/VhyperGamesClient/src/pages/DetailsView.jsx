import Footer from "../components/footerComponent/Footer";
import GameData from "../components/detailsViewComponents/gameDataComponent/GameData";
import GamePrice from "../components/detailsViewComponents/gamePriceComponent/GamePrice"
import classes from "../styles/DetailsView.module.css";
import { useParams } from "react-router-dom";
import ReviewEntry from "../components/detailsViewComponents/reviewEntryComponents/ReviewEntry";
import Reviews from "../components/detailsViewComponents/revewComponent/Reviews";
import GameRequeriments from "../components/detailsViewComponents/gameRequirements/GameRequirements";
import { getVarSessionStorage } from "../utils/keep";

function ViewDetails() {

  const params = useParams();
  const isAuthenticated = !!getVarSessionStorage('accessToken');
  console.log('isAuthenticated:', isAuthenticated);
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
          <ReviewEntry 
            gameId={params.gameId} 
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className={`${classes["view-details__system-requirements"]} ${classes.box}`}>
          <GameRequeriments id={params.gameId}/>
        </div>
        <div className={`${classes["view-details__reviews"]} ${classes.box}`}>
          <Reviews id={params.gameId}/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewDetails;
