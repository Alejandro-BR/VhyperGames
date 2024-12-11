import classes from "./ProductCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ConvertToDecimal } from "../../../utils/price";
import { BASE_URL } from "../../../config";
import Button from "../../Buttons/Button"

function ProductCard({ id, imgUrl, altText, title, price, stock }) {  
  const navigate = useNavigate();

  function precio() {
    return ConvertToDecimal(price);
  }

  const handleEditClick = () => {
    navigate(`/product-management-form/${id}`);
  };

  const Icon = ({ onClick }) => (
    <svg

      onClick={onClick}
      width="30"
      height="27"
      viewBox="0 0 30 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <g clipPath="url(#clip0_17_822)">
        <path fillRule="evenodd" clipRule="evenodd" d="M29.7775 15.4893L27.3605 17.9081L23.3318 13.8768L25.7487 11.4581C26.2862 10.9206 26.9577 11.4581 27.4949 11.9956L29.2407 13.7424C29.7775 14.2799 30.3147 14.9518 29.7775 15.4893ZM18.7362 3.75003H3.74747V22.5H11.2431V26.25H3.74747C1.68623 26.25 0 24.5625 0 22.5V3.75003C0 1.6875 1.68623 0 3.74747 0H18.7362C20.7974 0 22.4837 1.6875 22.4837 3.75003V9.375L18.7362 13.1251V3.75003ZM26.0176 19.2518L19.0242 26.2518H14.9954V22.2206L21.9885 15.2206L26.0176 19.2518Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_17_822">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );


  return (
    <article className={classes.card}>
      <Link to={`/juego/${id}`}>
        <div className={classes.imgContainer}>
          <img src={`${BASE_URL}${imgUrl}`} alt={altText} className={classes.gameImg} />
        </div>
      </Link>

      <div className={classes.titleContainer}>
        <h2 className={classes.containerTitle}>Título</h2>
        <p className={classes.title}>{title}</p>
      </div>

      <div className={classes.priceContainer}>
        <h2 className={classes.containerTitle}>Precio</h2>
        <p className={classes.price}>{precio()} €</p>
      </div>

      <div className={classes.stockContainer}>
        <h2 className={classes.containerTitle}>Stock</h2>
        <p className={classes.stock}>{stock}</p>
      </div>

      <div className={classes.editProduct}>
        <Button
          variant={"short"}
          color={"azul"}
          onClick={handleEditClick}
        >
          Editar producto
        </Button>
      </div>



    </article>
  );
}

export default ProductCard;
