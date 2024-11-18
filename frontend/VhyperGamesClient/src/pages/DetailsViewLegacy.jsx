import Footer from "../components/footerComponent/Footer";
import GameData from "../components/detailsViewComponents/gameDataComponent/GameData";
import GamePrice from "../components/detailsViewComponents/gamePriceComponent/GamePrice";
import classes from "../styles/DetailsViewExperimental.module.css";
import { useParams } from "react-router-dom";
import ReviewEntry from "../components/detailsViewComponents/reviewEntryComponents/ReviewEntry";
import Reviews from "../components/detailsViewComponents/revewComponent/Reviews";
import GameRequeriments from "../components/detailsViewComponents/gameRequirements/GameRequirements";

function DetailsViewLegacy() {
  const params = useParams();

  return (
    <>
      <div className={classes["details-view__info"]}>
        <section className={classes["details-view__game-data"]}>
          <GameData id={params.gameId} />
        </section>
        <section className={classes["details-view__game-price"]}>
          <GamePrice id={params.gameId} />
        </section>
        <section className={classes["details-view__game-requirements"]}>
          <GameRequeriments id={params.gameId} />
        </section>
        <section className={classes["details-view__review-entry"]}>
          <ReviewEntry gameId={params.gameId} />
        </section>
        <section className={classes["details-view__reviews"]}>
          <Reviews id={params.gameId} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default DetailsViewLegacy;
