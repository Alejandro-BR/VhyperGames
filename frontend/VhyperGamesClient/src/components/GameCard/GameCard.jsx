import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./GameCard.module.css";
import { BASE_URL } from "../../config";
import Rating from "./Rating";
import { ConvertToDecimal } from "../../utils/price"

function GameCard({ id, title, stock, price, imgUrl, avgRating }) {
  const [isStock, setIsStock] = useState(false);

  useEffect(() => {
    if (stock > 0) {
      setIsStock(true);
    } else {
      setIsStock(false);
    }
  }, [stock]);

  function precio() {
    return ConvertToDecimal(price);
  }

  return (
    <Link to={`/juego/${id}`}>
      <div className={classes.container}>
        <img src={`${BASE_URL}${imgUrl}`} alt={title} className={classes.gameCardImg} />
        <div className={classes.info}>
          <div className={classes.cardTitle}>
            <h2>{title}</h2>
            <div className={classes.rating}>
              <Rating avgRating={avgRating} />
            </div>

          </div>
          <div className={classes.cardPrice}>
            <p>{precio()} €</p>
            <p className={isStock ? classes.stock : classes.noStock}>
              {isStock ? "EN STOCK" : "SIN STOCK"}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default GameCard;
