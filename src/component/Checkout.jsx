import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/input";
import Button from "./UI/Button";
import ProgressContext from "../store/UserProgress";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "./hooks/useHttp";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const { data, error, isLoading, fetchData, clearData } = useHttp();

  const totalPrice = cartCtx.items.reduce(
    (total, item) => (total += item.quantity * item.price),
    0
  );

  const handleFinish = () => {
    progressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerInfo = Object.fromEntries(formData.entries());
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerInfo,
        },
      }),
    };
    fetchData("http://localhost:3000/orders", config);
  };

  if (data && !error) {
    return (
      <Modal open={progressCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  if (isLoading) {
    return <p className="center">isLoading...</p>;
  }

  return (
    <Modal open={progressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit} className="control">
        <h2>Checkout</h2>
        <p>total amount: {currencyFormatter.format(totalPrice)}</p>
        <Input type="text" label="full-name" id="name" />
        <Input type="text" label="Email" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-row">
          <Input type="text" label="Postal Code" id="postal-code" />
          <Input type="text" label="City" id="city" />
        </div>
        {error && <Error title="Failed to fetch" message={error.message} />}
        <p className="modal-actions">
          <Button textStyle onClick={() => progressCtx.hideCheckout()}>
            close
          </Button>
          <Button>Submit order</Button>
        </p>
      </form>
    </Modal>
  );
};
export default Checkout;
