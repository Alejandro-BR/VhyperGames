import classes from "./productCard.module.css"

function porductCard(id, title, stock, price, imgUrl) {

    function precio() {
        return ConvertToDecimal(price);
    }

    return (
        <article className={classes.card}>

            <Link to={`/juego/${id}`}>
                <img src={`${BASE_URL}${imgUrl}`} alt={title} className={classes.gameImg} />
            </Link>

            <div className={classes.titleContainer}>
                <h2 className={classes.containerTitle}>Título</h2>
                <p className={classes.title}>{title}</p>
            </div>

            <div className={classes.priceContainer}>
                <h2 containerTitle>Precio</h2>
                <p className={classes.precio}>{precio()} €</p>
            </div>

            <div className={classes.stockContainer}>
                <h2 containerTitle>Stock</h2>
                <p className={classes.stock}>
                    {stock}
                </p>
            </div>

        </article>
    );

}

export default porductCard

