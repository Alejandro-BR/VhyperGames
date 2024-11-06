import { useState, useEffect } from "react";
import clasess from "./GameCart.module.css";
import { BASE_URL } from "../../config";

function GameCart({ title, stock, price, imgUrl }) {

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
        <img src={`${BASE_URL}${imgUrl}`} className={clasess.gameCardImg} />
        <div className={clasess.cartTitle}>
          <h2>{truncateText(title)}</h2>
          <img src="/icon/carrito_header.svg" alt="carrito" className={clasess.carritoIcon} />
        </div>
        <div className={clasess.cartPrice}>
          <p>{price}  €</p>
          <p className={isStock ? clasess.stock : clasess.noStock}>{isStock ? "EN STOCK" : "SIN STOCK"}</p>
        </div>
      </div>
    </>
  )
}

export default GameCart;