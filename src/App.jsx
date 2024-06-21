import { useState } from "react";
import Header from "./component/header";
import FoodItems from "./component/foodItems";
import Cart from "./component/cart";
import "./index.css";
import Checkout from "./component/Checkout.jsx";
import { CartContextProvider } from "./store/cartContext";
import { ProgressContextProvider } from "./store/userProgress.jsx";

function App() {

  return (
    <ProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <FoodItems />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
