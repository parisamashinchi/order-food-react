import { useContext } from "react";
import { currencyFormatter} from "../util/formatting";
import  Button  from "./UI/Button";
import CartContext from '../store/CartContext';

const FoodItem = ({ food }) => {
  const {addItem} = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${food.image}`} className="" />
        <div>
          <h3>{food.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(food.price)}</p>
          <p className="meal-item-description">{food.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItem(food)} >Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};
export default FoodItem;
