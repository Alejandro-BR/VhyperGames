import { useState, useEffect } from "react";
import clasess from "./GameCard.module.css";
import { BASE_URL } from "../../config";

function GameCard({ title, stock, price, imgUrl }) {

  const [isStock, setIsStock] = useState()

  function comprobarStock() {
    if (stock > 0) {
      setIsStock(true)
    } else {
      setIsStock(false)
    }
  }

  function truncateText(text) {
    if (text.length > 19) {
      return text.slice(0, 19) + "...";
    }
    return text;
  }


  useEffect(() => {
    comprobarStock();
  }, []);

  function precio() {
    return (price / 100).toFixed(2);
  }

  return (
    <>
      <div className={clasess.container}>
        <img src={`${BASE_URL}${imgUrl}`} className={clasess.gameCardImg} />
        <div className={clasess.cardTitle}>
          <h2>{truncateText(title)}</h2>
        </div>
        <div className={clasess.cardPrice}>
          <p>{precio()}  €</p>
          <p className={isStock ? clasess.stock : clasess.noStock}>{isStock ? "EN STOCK" : "SIN STOCK"}</p>
        </div>
      </div>
    </>
  )
}

export default GameCard;