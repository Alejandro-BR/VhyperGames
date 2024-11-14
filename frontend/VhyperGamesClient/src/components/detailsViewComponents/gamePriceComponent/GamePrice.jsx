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
          avgRating:  data.avgRating, 
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
  
        // Si la cantidad es 0 se elimina
        if (newQuantity === 0) {
          cart.splice(existingProductIndex, 1); 
        }
      } else {
        if (newQuantity > 0) { // Se agrega si es mayor que 0
          cart.push(productData);
        }
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Evento carrito
      window.dispatchEvent(new Event('cart-updated'));
  
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
    return (productPriceData.price / 100).toFixed(2).replace('.',',');
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;



  return (
<div className={classes.priceCard}>

<div className={classes.leftPlane}>
  <img src="../../icon/avion-detalle.svg" alt="Avion detalle" className={classes.planeIcon} />
</div>

  <div className={classes.leftColumn}>
    <div className={classes.productCode}>
      <p className={classes.productCode}>Código: </p>
      <p className={classes.productId}>PROD-{id}</p>
    </div>

    <div className={classes.price}>
      <div><p>PRECIO</p></div>
      <p className={classes.priceEUR}>{price()} €</p>
    </div>

    <div className={classes.rating}>
      <p className={classes.label}>VALORACIÓN</p>
      <div className={classes.planesContainer}>
        {productPriceData.avgRating === null ? (
          <p className={classes.noReviews}>No existen reseñas.</p>
        ) : (
          [...Array(planeCount)].map((_, index) => (
            <Rating key={index} avgRating={productPriceData.avgRating} />
          ))
        )}
      </div>
    </div>
  </div>

  <div className={classes.rightColumn}>
    <div className={classes.stockStatus}>
      {productPriceData.stock > 0 ? (
        <span className={classes.inStock}>EN STOCK</span>
      ) : (
        <span className={classes.outOfStock}>SIN STOCK</span>
      )}
    </div>

    <div className={classes.cartIcon}>
      <img src="../../icon/carrito_header.svg" alt="Carrito" />
    </div>

    <div className={classes.quantityControls}>
      <button onClick={() => handleQuantityChange("decrease")}>-</button>
      <span>{productPriceData.quantity}</span>
      <button onClick={() => handleQuantityChange("increase")}>+</button>
    </div>
  </div>
</div>
  );
};

export default ProductCard;
