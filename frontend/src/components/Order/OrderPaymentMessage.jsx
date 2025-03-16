import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { localStorageConfig } from "../../config/LocalStorageConfig";

function OrderPaymentMessage({ paymentMessage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMessage === "succeeded") {
      dispatch(setCart([]));
      localStorage.removeItem(localStorageConfig.CART);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, []);
  return (
    <div>
      <h1>
        {paymentMessage === "succeeded" &&
          "Your payment was successufully completed!"}
      </h1>
    </div>
  );
}

export default OrderPaymentMessage;
