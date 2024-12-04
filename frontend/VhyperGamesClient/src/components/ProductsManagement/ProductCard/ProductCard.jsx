import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { ConvertToDecimal } from "../../../utils/price";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { useAuth } from "../../../context/AuthContext";
import GameFormModal from "../GameFormModal/GameFormModal";



function ProductCard() {
  const { token, decodedToken } = useAuth();
  const { games, fetchGames } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameFormModal, setGameFormModal] = useState(false);

  // Verificar si el usuario tiene el rol de admin antes de cargar los juegos
  useEffect(() => {
    console.log("Token en AdminProvider:", token);
    console.log("decodedToken en AdminProvider:", decodedToken);

    if (token && decodedToken?.role === "Admin") {
      console.log("Llamando a fetchGames...");
      fetchGames();
    }
  }, [token, decodedToken]);


  // NO ENTIENDO POR QUÉ NO FUNCIONA EL FETCH NI EL MAP

  let imgUrl = "/img/sekiro.png";
  let title =
    "El brujero 38 ahora es personal se vienen ,ertymetmetm ety jtdryjm";
  let price = 1999;
  let stock = 30;
  let id = 0;

  function precio() {
    return ConvertToDecimal(price);
  }

  return (
    <>
      <article className={classes.card}>
        <Link to={`/juego/${id}`}>
          <img src={imgUrl} alt={title} className={classes.gameImg} />
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
            onClose={() => setGameFormModal(false)}
          />
        )
      }
    </>

  );
}

export default ProductCard;
