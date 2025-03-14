import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backStep, nextStep } from "../../store/cart/orderSlice";

function OrderButtons() {
  const { cart } = useSelector((state) => state.cartStore);
  const { currentStep } = useSelector((state) => state.orderStore);
  const dispatch = useDispatch();
  if (cart.length < 1) return;

  return (
    <div className="container">
      {currentStep === 1 && (
        <div className="buttons-wrapper">
          <button onClick={() => dispatch(nextStep())}>
            Proceed to Payment
          </button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="buttons-wrapper">
          <button onClick={() => dispatch(backStep())}>Back</button>
          <button onClick={() => dispatch(nextStep())}>Submit Payment</button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="buttons-wrapper">
          <button onClick={() => dispatch(backStep())}>Back</button>
          <button onClick={() => dispatch(nextStep())}>Submit payment</button>
        </div>
      )}
    </div>
  );
}

export default OrderButtons;
