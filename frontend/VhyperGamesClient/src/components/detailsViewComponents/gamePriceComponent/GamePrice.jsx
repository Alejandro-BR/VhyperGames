import React, { useState, useEffect } from "react";
import classes from './GamePrice.module.css';
import { DETAILS_VIEW_GAME_PRICE } from "../../../config";

const ProductCard = ({ id }) => {
  const [productPriceData, setProductPriceData] = useState({
    price: 0,
    avgRating: 0,
    stock: 0,
    quantity: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("ID no válido");
      setLoading(false);
      return;
    }

    async function fetchPriceData() {
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
          quantity: data.quantity || 0
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPriceData();

    // Cleanup en caso de que el componente sea desmontado antes de que termine la carga
    return () => {
      setLoading(false);
      setError(null);
    };
  }, [id]); // Dependencia en el id para que se recargue cuando cambie

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleQuantityChange = (operation) => {
    setProductPriceData(prevState => {
      const newQuantity = operation === "increase" 
        ? Math.min(prevState.quantity + 1, productPriceData.stock) 
        : Math.max(prevState.quantity - 1, 0);
      
      return { ...prevState, quantity: newQuantity };
    });
  };

  return(
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
        {Array.from({ length: 5 }, (_, index) => (
          <span 
            key={index} 
            className={productPriceData.avgRating > index ? classes.ratingIconActive : classes.ratingIcon}
          >
            🚀
          </span>
        ))}
      </div>

      <div className={classes.quantityControls}>
        <button onClick={() => handleQuantityChange("decrease")}>-</button>
        <span>{productPriceData.quantity}</span>
        <button onClick={() => handleQuantityChange("increase")}>+</button>
      </div>

      <button className={classes.addToCart}>Añadir al Carrito</button>
    </div>
  );
}

export default ProductCard;
