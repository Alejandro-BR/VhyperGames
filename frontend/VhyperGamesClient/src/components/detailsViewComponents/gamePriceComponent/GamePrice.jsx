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
          avgRating: data.avgRating, // Asegúrate de que avgRating venga en la respuesta
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleQuantityChange = (operation) => {
    setProductPriceData((prevState) => {
      const newQuantity = operation === "increase"
        ? Math.min(prevState.quantity + 1, prevState.stock)
        : Math.max(prevState.quantity - 1, 0);

      return { ...prevState, quantity: newQuantity };
    });
  };

  return (
    <div className={classes.priceCard}>
      <div className={classes.productCode}>
        <p>Código: PROD-{id}</p>
      </div>

      <div className={classes.price}>
        <p>{productPriceData.price.toFixed(2)} €</p>
      </div>

      <div className={classes.stockStatus}>
        {productPriceData.stock > 0 ? (
          <span className={classes.inStock}>EN STOCK</span>
        ) : (
          <span className={classes.outOfStock}>SIN STOCK</span>
        )}
      </div>

      <div className={classes.rating}>
        <Rating avgRating={productPriceData.avgRating} />
      </div>

      <div className={classes.quantityControls}>
        <button onClick={() => handleQuantityChange("decrease")}>-</button>
        <span>{productPriceData.quantity}</span>
        <button onClick={() => handleQuantityChange("increase")}>+</button>
      </div>

      <button className={classes.addToCart}>Añadir al Carrito</button>
    </div>
  );
};

export default ProductCard;
