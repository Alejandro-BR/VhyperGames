import classes from "./ProductCard.module.css"
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import { ConvertToDecimal } from "../../utils/price"

function ProductCard(
    // id, title, stock, price, imgUrl
) {



    // NO ENTIENDO POR QUÉ NO FUNCIONA EL FETCH NI EL MAP

    let imgUrl = "/img/sekiro.png"
    let title = "El brujero 38 ahora es personal se vienen ,ertymetmetm ety jtdryjm"
    let price = 1999
    let stock = 30
    let id = 0

    function precio() {
        return ConvertToDecimal(price);
    }

    return (
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

            <button className={classes.editGame}>
                <img src="/icon/edit-icon.svg" alt="editar producto" />
            </button>

        </article>
    );


}

export default ProductCard

