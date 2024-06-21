import { useContext } from "react";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting";
import ProgressContext from "../store/UserProgress";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  return (
    <Modal className="cart" open={progressCtx.progress === "cart"}>
      <h2> Your Cart</h2>
      <ul>
        {cartCtx.items.map((food) => {
          return (
            <CartItem
              key={food.id}
              food={food}
              onDecrease={() => cartCtx.removeItem(food.id)}
              onIncrease={() => cartCtx.addItem(food)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textStyle onClick={() => progressCtx.hideCart()}>
          {" "}
          close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={() => progressCtx.showCheckout()}>
            Go to checkout
          </Button>
        )}
      </p>
    </Modal>
  );
};
export default Cart;
