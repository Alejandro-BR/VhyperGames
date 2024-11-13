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
          avgRating: data.avgRating ?? null, 
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

      sessionStorage.setItem('cartQuantity', newQuantity); //Usar funcion o no?
      return { ...prevState, quantity: newQuantity };
    });
  };

  //Según el rating, muestra 1, 2 o 3 aviones con su color.
  const getPlaneCount = (avgRating) => {
    if (avgRating < 0) return 1;
    if (avgRating === 0) return 2;
    if (avgRating > 0) return 3;
    return 0;
  };

  const planeCount = getPlaneCount(productPriceData.avgRating);

  const price = () => {
    return (productPriceData.price / 100).toFixed(2);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;



  return (
    <div className={classes.priceCard}>

<div className={classes.leftPlaneWithStripes}>
        <div className={classes.planeWithStripes}>
        <img src="../../icon/icono-nave.svg" alt="nave"/>
        </div>
      </div>

      <div className={classes.productCode}>
        <p>Código: PROD-{id}</p>
      </div>

      <div className={classes.price}>
        <div><p>PRECIO</p></div>
        <p>{price()} €</p>
      </div>

      <div className={classes.stockStatus}>
        {productPriceData.stock > 0 ? (
          <span className={classes.inStock}>EN STOCK</span>
        ) : (
          <span className={classes.outOfStock}>SIN STOCK</span>
        )}
      </div>

      <div className={classes.rating}>
          <p className={classes.label}>VALORACIÓN</p>
          <div className={classes.planesContainer}>
            {productPriceData.avgRating === null ? (  // Verificar si no hay reseñas
              <p className={classes.noReviews}>No existen reseñas.</p>
            ) : (
              [...Array(planeCount)].map((_, index) => ( 
                <Rating key={index} avgRating={productPriceData.avgRating} />
              ))
            )}
          </div>
        </div>

      <div className={classes.cartIconWrapper}>
            <img src="../../icon/carrito_header.svg" alt="Carrito" className={classes.cartIcon} />
          </div>
      <div className={classes.quantityButtons}>
            <button onClick={() => handleQuantityChange("decrease")}>-</button>
            <span>{productPriceData.quantity}</span>
            <button onClick={() => handleQuantityChange("increase")}>+</button>
          </div>
          
    </div>
  );
};

export default ProductCard;
