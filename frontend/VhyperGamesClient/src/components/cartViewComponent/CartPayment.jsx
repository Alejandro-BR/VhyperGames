import { ConvertToDecimal } from "../../utils/price";
import Title from "../titleComponent/Title"

function CartPayment() {
  let precioBack = 4498;
  const precio = ConvertToDecimal(precioBack);

  return <>
    <Title>Carrito</Title>
  </>;
}

export default CartPayment;