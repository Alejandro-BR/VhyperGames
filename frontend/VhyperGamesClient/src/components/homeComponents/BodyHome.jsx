import Carousel from "./Carousel";
import OfertasNuevos from "./OfertasNuevo";
import styles from "./BodyHome.module.css";

function BodyHome() {
  return (
    <div className={styles.bodyHome}>
      <Carousel />
      <OfertasNuevos />
    </div>
  );
}

export default BodyHome;