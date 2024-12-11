import { useState, useEffect, useContext } from "react";
import classes from './GamePrice.module.css';
import { CartContext } from "../../../context/CartContext";
import { DETAILS_VIEW_GAME_PRICE } from "../../../config";
import Rating from '../../GameCard/Rating';
import { ConvertToDecimal } from '../../../utils/price';
import QuantityButton from "../../Buttons/QuantityButton";

const ProductCard = ({ id }) => {
  const { items = [], handleQuantityChange } = useContext(CartContext); 
  const [productPriceData, setProductPriceData] = useState({
    price: 0,
    avgRating: 0,
    stock: 0,
    quantity: 0,
  });
  const [error, setError] = useState(null);

 
  useEffect(() => {
    if (!id) {
      setError("ID no válido");
      return;
    }

    const fetchPriceData = async () => {
      setError(null);
      try {
        const response = await fetch(`${DETAILS_VIEW_GAME_PRICE}?id=${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del producto");
        }
        const data = await response.json();
        const productInCart = items.find((item) => item.gameId === Number(id)) || {};
        setProductPriceData({
          price: data.price,
          avgRating: data.avgRating,
          stock: data.stock,
          quantity: productInCart.quantity || 0,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPriceData();
  }, [id, items]);

  // Actualizar la cantidad local si cambian los datos del carrito global
  useEffect(() => {
    const productInCart = items.find((item) => item.gameId === id) || {};
    setProductPriceData((prevData) => ({
      ...prevData,
      quantity: productInCart.quantity || 0,
    }));
  }, [id, items]);

  // Calcular el número de iconos de aviones según la valoración
  const getPlaneCount = (avgRating) => {
    if (avgRating < 0) return 1;
    if (avgRating === 0) return 2;
    if (avgRating > 0) return 3;
    return 0;
  };

  const planeCount = getPlaneCount(productPriceData.avgRating);

  const price = () => {
    return ConvertToDecimal(productPriceData.price);
  };

  if (error) {
    return <div className={classes['price-card']}>Error: {error}</div>;
  }

  return (
    <div className={classes['price-card']}>
      <div className={classes['price-card__left-plane']}>
        <img
          src="../../icon/avion-detalle.svg"
          alt="Avion detalle"
          className={classes['price-card__plane-icon']}
        />
      </div>

      <div className={classes['price-card__left-column']}>
        <div className={classes['price-card__product-code']}>
          <p>Código: </p>
          <p className={classes['price-card__product-id']}>PROD-{id}</p>
        </div>

        <div className={classes['price-card__price']}>
          <p>PRECIO</p>
          <p className={classes['price-card__price-eur']}>{price()} €</p>
        </div>

        <div className={classes['price-card__rating']}>
          <p className={classes['price-card__label']}>VALORACIÓN</p>
          <div className={classes['price-card__planes-container']}>
            {productPriceData.avgRating === null ? (
              <p className={classes['price-card__no-reviews']}>
                No existen reseñas.
              </p>
            ) : (
              [...Array(planeCount)].map((_, index) => (
                <Rating key={index} avgRating={productPriceData.avgRating} />
              ))
            )}
          </div>
        </div>
      </div>

      <div className={classes['price-card__right-column']}>
        <div className={classes['price-card__stock-status']}>
          {productPriceData.stock > 0 ? (
            <span className={classes['price-card__stock-status--in-stock']}>
              EN STOCK: {productPriceData.stock}
            </span>
          ) : (
            <span className={classes['price-card__stock-status--out-of-stock']}>
              SIN STOCK
            </span>
          )}
        </div>

        <div className={classes['price-card__cart-icon']}>
          <img src="../../icon/carrito_header.svg" alt="Carrito" />
        </div>
        <QuantityButton id={id} stock={productPriceData.stock}/>
      </div>
    </div>
  );
};

export default ProductCard;
