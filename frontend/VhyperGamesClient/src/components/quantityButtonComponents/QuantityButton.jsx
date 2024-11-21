import classes from './QuantityButton.module.css';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function QuantityButton({ id, stock }) {
  const { items, handleQuantityChange } = useContext(CartContext);

  // Encuentra el producto actual en el carrito
  const currentProduct = items.find((item) => item.gameId === id) || {};
  const quantity = currentProduct.quantity || 0;

  return (
    <div className={classes['quantity-controls']}>
      <button
        disabled={quantity <= 0}
        onClick={() => handleQuantityChange(id, "decrease")}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        disabled={stock <= quantity}
        onClick={() => handleQuantityChange(id, "increase")}
      >
        +
      </button>
    </div>
  );
}

export default QuantityButton;