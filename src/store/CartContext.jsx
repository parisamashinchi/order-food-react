import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_FOOD") {
    const findIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems = [...state.items];
    let updateItem = updatedItems[findIndex];
    if (findIndex > -1) {
      //if item exist in cart
      updatedItems[findIndex] = {
        ...action.item,
        quantity: updateItem.quantity + 1,
      };
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  } else if (action.type === "REMOVE_FOOD") {
    const findIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[findIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(findIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[findIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  } else if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  } else {
    return state;
  }
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispatchCart({ type: "ADD_FOOD", item });
  }
  function removeItem(id) {
    dispatchCart({ type: "REMOVE_FOOD", id });
  }
  function clearCart() {
    dispatchCart({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
