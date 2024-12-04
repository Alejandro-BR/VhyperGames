import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { ConvertToDecimal } from "../../../utils/price";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContext";
import GameFormModal from "../GameFormModal/GameFormModal";
import { BASE_URL } from "../../../config";



function ProductCard({ id, imgUrl, altText, title, price, stock }) {
  const [gameFormModal, setGameFormModal] = useState(false);
  const { GetFormGame, updateGames, dataForm } = useContext(AdminContext);

  const handleSubmit = async (formData) => {
    const data = await GetFormGame(id);
    console.log("este es el id", id)
    console.log("este es data", data)
    console.log("esto es dataform", dataForm);
    setGameFormModal(false);
  };

  function precio() {
    return ConvertToDecimal(price);
  }

  return (
    <>
      <article className={classes.card}>
        <Link to={`/juego/${id}`}>
          <img src={`${BASE_URL}${imgUrl}`} alt={altText} className={classes.gameImg} />
        </Link>

        <div className={classes.container}>
          <h2 className={classes.containerTitle}>Título</h2>
          <p className={classes.title}>{title}</p>
        </div>

        <div className={classes.container}>
          <h2 className={classes.containerTitle}>Precio</h2>
          <p className={classes.price}>{precio()} €</p>
        </div>

        <div className={classes.container}>
          <h2 className={classes.containerTitle}>Stock</h2>
          <p className={classes.stock}>{stock}</p>
        </div>

        <button className={classes.editGame} onClick={() => setGameFormModal(true)}>
          <img src="/icon/edit-icon.svg" alt="editar producto" />
        </button>

      </article>

      {
        gameFormModal && (
          <GameFormModal
            modalPurpose="Editar"
            onSubmit={handleSubmit}
            onClose={() => setGameFormModal(false)}
          />
        )
      }
    </>

  );
}

export default ProductCard;
