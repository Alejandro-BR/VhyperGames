import { messageEuros , messageEthereum} from '../../helpers/messages';
import { ConvertToDecimal } from "../../utils/price";
import Button from "../buttonComponent/Button"
import classes from "./CartPayment.module.css"

function CartPayment() {
  let precioBack = 4498; // Hay que cogerlo desde el contexto 
  const precio = ConvertToDecimal(precioBack);

  return (<div className={classes.cartPayment} >
    <div className={classes.cartPayment__containerTitle}>
      <p className={classes.cartPayment__palito}>&#10073;</p>
      <p className={classes.cartPayment__title}>Carrito</p>
    </div>
    <p className={classes.cartPayment__total}>TOTAL</p>
    <div className={classes.cartPayment__price}>
      <p >{precio} €</p>
    </div>
    <hr className={classes.cartPayment__line}/>
    <div className={classes.cartPayment__containerButtons}>
      <Button
        variant={"medium"}
        color={"morado-azul"}
        onClick={messageEuros}
      >PAGAR EN <br/> EUROS</Button>
      <Button
        variant={"medium"}
        color={"azul-morado"}
        onClick={messageEthereum}
      >PAGAR EN ETHEREUM</Button>
    </div>
  </div>);
}

export default CartPayment;