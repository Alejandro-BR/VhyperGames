import { useState } from "react";
import classes from "./DetailsCarousel.module.css";
import { BASE_URL } from "../../../config";

function DetailsCarousel({ imgGames }) {
  const imgSource = imgGames;

  // Estado para la imagen actual
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgSource.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imgSource.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={classes.container}>
      {/* Flecha izquierda */}
      <div
        className={`${classes.arrow} ${classes.leftArrow}`}
        onClick={goToPrevious}
      >
        <img src="/icon/arrow-left.svg" alt="Flecha izquierda" className={classes.rotation} />
      </div>

      <section className={classes.carousel}>
        {/* Imagen */}
        <article className={classes.img}>
          {imgSource && imgSource.length > 0 ? (
            <img
              src={`${BASE_URL}${imgSource[currentIndex]?.imageUrl}`}
              alt={imgSource[currentIndex]?.altText || "Imagen no disponible"}
            />
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </article>
      </section>

      {/* Flecha derecha */}
      <div
        className={`${classes.arrow} ${classes.rightArrow}`}
        onClick={goToNext}
      >
        <img src="/icon/arrow-right.svg" alt="Flecha derecha" />
      </div>
    </div>
  );
}

export default DetailsCarousel;
