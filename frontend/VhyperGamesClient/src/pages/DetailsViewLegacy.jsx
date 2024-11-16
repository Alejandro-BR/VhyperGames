import Footer from "../components/footerComponent/Footer";
import GameData from "../components/detailsViewComponents/gameDataComponent/GameData";
import GamePrice from "../components/detailsViewComponents/gamePriceComponent/GamePrice"
import classes from "../styles/DetailsViewExperimental.module.css";
import { useParams } from "react-router-dom";
import ReviewEntry from "../components/detailsViewComponents/reviewEntryComponents/ReviewEntry";
import Reviews from "../components/detailsViewComponents/revewComponent/Reviews";
import GameRequeriments from "../components/detailsViewComponents/gameRequirements/GameRequirements";


function DetailsViewLegacy() {

  const params = useParams();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.info}>
          <section className={classes.gameData} >
            <GameData id={params.gameId} />
          </section>
          <section className={classes.gamePrice}>
            <GamePrice id={params.gameId} />
          </section>

          <section className={classes.gameRequeriments}>
            <GameRequeriments id={params.gameId} />
          </section>

        </div>

        <div className={classes.reviews}>
          <ReviewEntry gameId={params.gameId} className={classes.revewEntry} />
          <Reviews id={params.gameId} className={classes.rev} />
        </div>

      </div>
      <Footer />
    </>
  );
}

export default DetailsViewLegacy;
