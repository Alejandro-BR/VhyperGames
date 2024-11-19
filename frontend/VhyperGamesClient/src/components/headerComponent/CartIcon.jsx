import React, { useState, useEffect, useContext } from 'react';
import classes from './CartIcon.module.css';
import { CartContext } from "../../context/CartContext";

const CartIcon = ({ onClick }) => {
  const { items } = useContext(CartContext); // Obtenemos los items desde el contexto
  const [cartCount, setCartCount] = useState(0);

  // Calculamos la cantidad total de productos en el carrito
  useEffect(() => {
    const totalQuantity = items.reduce((total, product) => total + product.quantity, 0);
    setCartCount(totalQuantity);
  }, [items]); // Se ejecuta cada vez que los items cambian

  return (
    <div className={classes.cartIconWrapper} onClick={onClick}>
      <img
        className={classes.icon}
        src="../icon/carrito_header.svg"
        alt="cart"
      />
      {cartCount > 0 && <span className={classes.cartCount}>{cartCount}</span>}
    </div>
  );
};

export default CartIcon;
