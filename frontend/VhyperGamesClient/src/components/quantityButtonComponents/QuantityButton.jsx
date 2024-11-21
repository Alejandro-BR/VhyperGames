import classes from './QuantityButton.module.css'
import { CartContext } from '../../context/CartContext';
import { useContext, useEffect, useState } from 'react';


function QuantityButton({id, stock}) {

  const {items, handleQuantityChange} = useContext(CartContext);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    const newQuantity = items.find(() => {items.id == id});
    setQuantity(newQuantity);
  }, [items, id]);

  return (<div className={classes['quantity-controls']}>
    <button
      disabled={quantity <= 0}
      onClick={() => handleQuantityChange(id, "decrease")}
    >
      -
    </button>
    <span>{quantity}</span>
    <button
      disabled={stock <= quantity}
      onClick={() => {handleQuantityChange(id, "increase")
        console.log(id + " Esto es el id supuestamente");
      }}
    >
      +
    </button>
  </div>);
}

export default QuantityButton;