import classes from "./ProductCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ConvertToDecimal } from "../../../utils/price";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { BASE_URL } from "../../../config";

function ProductCard({ id, imgUrl, altText, title, price, stock }) {
  const { GetFormGame } = useContext(AdminContext);
  const navigate = useNavigate();

  function precio() {
    return ConvertToDecimal(price);
  }

  const handleEditClick = () => {
    navigate(`/product-management-form/${id}`); 
  };

  return (
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

      <button className={classes.editGame} onClick={handleEditClick}>
        <img src="/icon/edit-icon.svg" alt="editar producto" />
      </button>
    </article>
  );
}

export default ProductCard;
