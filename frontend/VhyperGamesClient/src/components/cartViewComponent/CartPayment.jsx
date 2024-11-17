import { ConvertToDecimal } from "../../utils/price";
import Button from "../buttonComponent/Button"

import classes from "./CartPayment.module.css"

function CartPayment() {
  let precioBack = 4498;
  const precio = ConvertToDecimal(precioBack);

  return (<div className={classes.cartPayment} >
    <p className={classes.cartPayment__title}>Carrito</p>
    <p className={classes.cartPayment__total}>TOTAL</p>
    <div className={classes.cartPayment__precio}>
      <p >{precio} €</p>
    </div>
    <hr className={classes.cartPayment__line}/>
    <div className={classes.cartPayment__containerButtons}>
      <Button
        variant={"medium"}
        color={"morado-azul"}
        // onClick={alert("Hola")}
      >PAGAR EN EUROS</Button>
      <Button
        variant={"medium"}
        color={"azul-morado"}
        // onClick={alert("Hola")}
      >PAGAR EN ETHEREUM</Button>
    </div>
  </div>);
}

export default CartPayment;