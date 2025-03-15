import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function OrderPaymentMessage({ paymentMessage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMessage === "succeeded") {
      dispatch(setCart([]));
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, []);
  return (
    <div>
      <h1>{paymentMessage}</h1>
    </div>
  );
}

export default OrderPaymentMessage;
