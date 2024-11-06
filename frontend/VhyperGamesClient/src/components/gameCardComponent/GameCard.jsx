import { useState, useEffect } from "react";
import clasess from "./GameCard.module.css";

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
    if (text.length > 15) {
      return text.slice(0, 15) + " ...";
    }
    return text;
  }


  useEffect(() => {
    comprobarStock();
  }, []);

  return (
    <>
      <div className={clasess.container}>
        <img src={imgUrl} className={clasess.gameCardImg} />
        <div className={clasess.cardTitle}>
          <h2>{truncateText(title)}</h2>
          {/* <img src="/icon/carrito_header.svg" alt="carrito" className={clasess.carritoIcon} /> */}
        </div>
        <div className={clasess.cardPrice}>
          <p>{(price / 100).toFixed(2)}  €</p>
          <p className={isStock ? clasess.stock : clasess.noStock}>{isStock ? "EN STOCK" : "SIN STOCK"}</p>
        </div>
      </div>
    </>
  )




}

export default GameCard;