import CartListGames from "../components/cartViewComponent/CartListGames";
import CartPayment from "../components/cartViewComponent/CartPayment";

function Cart() {
    return (
        <div>
            <CartListGames />
            <CartPayment />
        </div>
    )
}

export default Cart;