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
        <svg
          width="30"
          height="30"
          viewBox="-1 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classes.rotation}
        >
          <path
            d="M4.64645 13.4112L4.29289 13.7647L4.64645 14.1183L6.05821 15.53L6.41176 15.8836L6.76532 15.53L13.3536 8.94179L13.7071 8.58824L13.3536 8.23468L6.76532 1.64645L6.41176 1.29289L6.05821 1.64645L4.64645 3.05821L4.29289 3.41176L4.64645 3.76532L9.46936 8.58824L4.64645 13.4112Z"
            fill="#fff"
          />
        </svg>
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
        <svg
          width="30"
          height="30"
          viewBox="-1 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.64645 13.4112L4.29289 13.7647L4.64645 14.1183L6.05821 15.53L6.41176 15.8836L6.76532 15.53L13.3536 8.94179L13.7071 8.58824L13.3536 8.23468L6.76532 1.64645L6.41176 1.29289L6.05821 1.64645L4.64645 3.05821L4.29289 3.41176L4.64645 3.76532L9.46936 8.58824L4.64645 13.4112Z"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  );
}

export default DetailsCarousel;
