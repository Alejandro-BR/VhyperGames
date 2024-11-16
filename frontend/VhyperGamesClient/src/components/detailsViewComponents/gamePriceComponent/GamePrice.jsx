import React, { useState, useEffect } from "react";
import classes from './GamePrice.module.css';
import { DETAILS_VIEW_GAME_PRICE } from "../../../config";
import Rating from '../../gameCardComponent/Rating';

const ProductCard = ({ id }) => {
  const [productPriceData, setProductPriceData] = useState({
    price: 0,
    avgRating: 0,
    stock: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("ID no válido");
      setLoading(false);
      return;
    }

    const fetchPriceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${DETAILS_VIEW_GAME_PRICE}?id=${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();

        setProductPriceData({
          price: data.price,
          avgRating: data.avgRating,
          stock: data.stock,
          quantity: data.quantity || 0,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [id]);

  const handleQuantityChange = (operation) => {
    setProductPriceData((prevState) => {
      const newQuantity = operation === "increase"
        ? Math.min(prevState.quantity + 1, prevState.stock)
        : Math.max(prevState.quantity - 1, 0);

      const productData = {
        id,
        quantity: newQuantity,
      };

      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingProductIndex = cart.findIndex(item => item.id === id);

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity = newQuantity;

        if (newQuantity === 0) {
          cart.splice(existingProductIndex, 1);
        }
      } else {
        if (newQuantity > 0) {
          cart.push(productData);
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      window.dispatchEvent(new Event('cart-updated'));

      return { ...prevState, quantity: newQuantity };
    });
  };

  const getPlaneCount = (avgRating) => {
    if (avgRating < 0) return 1;
    if (avgRating === 0) return 2;
    if (avgRating > 0) return 3;
    return 0;
  };

  const planeCount = getPlaneCount(productPriceData.avgRating);

  const price = () => {
    return (productPriceData.price / 100).toFixed(2).replace('.', ',');
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes['price-card']}>

      <div className={classes['price-card__left-plane']}>
        <img src="../../icon/avion-detalle.svg" alt="Avion detalle" className={classes['price-card__plane-icon']} />
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
              <p className={classes['price-card__no-reviews']}>No existen reseñas.</p>
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
            <span className={classes['price-card__stock-status--in-stock']}>EN STOCK: {productPriceData.stock}</span>
          ) : (
            <span className={classes['price-card__stock-status--out-of-stock']}>SIN STOCK</span>
          )}
        </div>

        <div className={classes['price-card__cart-icon']}>
          <img src="../../icon/carrito_header.svg" alt="Carrito" />
        </div>

        <div className={classes['price-card__quantity-controls']}>
          <button onClick={() => handleQuantityChange("decrease")}>-</button>
          <span>{productPriceData.quantity}</span>
          <button onClick={() => handleQuantityChange("increase")}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
