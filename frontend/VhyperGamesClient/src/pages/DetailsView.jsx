import { useParams } from "react-router-dom";
import classes from "../styles/DetailsView.module.css";

import Footer from "../components/Footer/Footer";
import GameData from "../components/DetailsView/GameData/GameData";
import GamePrice from "../components/DetailsView/GamePrice/GamePrice";
import ReviewEntry from "../components/DetailsView/Reviews/ReviewEntry";
import Reviews from "../components/DetailsView/Reviews/Reviews";
import GameRequeriments from "../components/DetailsView/GameRequeriments/GameRequirements";

function DetailsView() {
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

export default DetailsView;
