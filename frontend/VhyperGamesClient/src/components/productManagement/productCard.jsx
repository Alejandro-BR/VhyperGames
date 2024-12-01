import classes from "./productCard.module.css"
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import { ConvertToDecimal } from "../../utils/price"

function ProductCard(
    id, title, stock, price, imgUrl
) {

    function precio() {
        return ConvertToDecimal(price);
    }

    // NO ENTIENDO POR QUÉ NO FUNCIONA EL FETCH NI EL MAP

    return (
        <article className={classes.card}>

            <Link to={`/juego/${id}`}>
                <img src={`${BASE_URL}${imgUrl}`} alt={title} className={classes.gameImg} />
                {/* <img src="/img/witcher3.png" alt="" /> */}
            </Link>

            <div className={classes.titleContainer}>
                <h2 className={classes.containerTitle}>Título</h2>
                <p className={classes.title}>{title}</p>
                {/* <p>The Witcher</p> */}
            </div>

            <div className={classes.priceContainer}>
                <h2 containerTitle>Precio</h2>
                <p className={classes.precio}>{precio()} €</p>
                {/* <p>18.99 €</p> */}
            </div>

            <div className={classes.stockContainer}>
                <h2 containerTitle>Stock</h2>
                <p className={classes.stock}>{stock}</p>
                {/* <p>18</p> */}
            </div>

        </article>
    );

}

export default ProductCard

