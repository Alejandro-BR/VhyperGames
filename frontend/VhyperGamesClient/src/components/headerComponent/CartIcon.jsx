import React, { useState, useEffect } from 'react';
import classes from './CartIcon.module.css';

const CartIcon = ({ onClick }) => {
  const [cartCount, setCartCount] = useState(0);

  const calculateCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cartData.reduce((total, product) => total + product.quantity, 0);
    setCartCount(totalQuantity);
  };

  useEffect(() => {
    calculateCartCount();
    // Cambios en el carrito
    window.addEventListener('cart-updated', calculateCartCount);

    return () => {
      window.removeEventListener('cart-updated', calculateCartCount);
    };
  }, []); 

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
