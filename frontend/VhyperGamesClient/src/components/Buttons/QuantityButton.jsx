import classes from './QuantityButton.module.css';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function QuantityButton({ id, stock, bin = false }) {
  const { items, handleQuantityChange, deleteCartItem } = useContext(CartContext);

  // Encuentra el producto actual en el carrito
  const currentProduct = items.find((item) => item.gameId === Number(id)) || {};
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
      {bin && 
        <div className={classes['quantity-controls__bin']}>
          <img src="/icon/icono-bin.svg" alt="Icono basura" onClick={() => {deleteCartItem(id)}}/>
        </div>
      }
    </div>
  );
}

export default QuantityButton;