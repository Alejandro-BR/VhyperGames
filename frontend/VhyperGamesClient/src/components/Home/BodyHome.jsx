import Carousel from "./Carousel";
import OfertasNuevos from "./OfertasNuevo";
import classes from "./BodyHome.module.css";

function BodyHome() {
  return (
    <div className={classes.bodyHome}>
      <Carousel />
      <OfertasNuevos />
    </div>
  );
}

export default BodyHome;