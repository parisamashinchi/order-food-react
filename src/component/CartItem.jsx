import { currencyFormatter } from "../util/formatting";

const CartItem = ({ food, onDecrease, onIncrease }) => {
  return (
    <li className="cart-item">
      <p>
        {food.name} - {food.quantity} - {currencyFormatter.format(food.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{food.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};
export default CartItem;
