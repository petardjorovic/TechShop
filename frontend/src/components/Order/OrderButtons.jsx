import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backStep, nextStep } from "../../store/cart/orderSlice";
import "./OrderButtons.scss";
import { FaChevronLeft, FaChevronRight, FaCheck } from "react-icons/fa";

function OrderButtons({ submitPayment }) {
  const { cart } = useSelector((state) => state.cartStore);
  const { currentStep } = useSelector((state) => state.orderStore);
  const dispatch = useDispatch();

  return (
    <div className="container">
      {currentStep === 1 && (
        <div
          className="buttons-wrapper"
          style={
            currentStep === 1
              ? { justifyContent: "flex-end" }
              : { justifyContent: "space-between" }
          }
        >
          <button
            onClick={() => dispatch(nextStep())}
            className="btn btn-success btn-next"
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      )}
      {currentStep === 2 && (
        <div
          className="buttons-wrapper"
          style={
            currentStep === 1
              ? { justifyContent: "flex-end" }
              : { justifyContent: "space-between" }
          }
        >
          <button
            onClick={() => dispatch(backStep())}
            className="btn btn-warning btn-back"
          >
            <FaChevronLeft /> Back
          </button>
          <button
            onClick={() => dispatch(nextStep())}
            className="btn btn-success btn-next"
          >
            Proceed to Payment
            <FaChevronRight />
          </button>
        </div>
      )}
      {currentStep === 3 && (
        <div
          className="buttons-wrapper"
          style={
            currentStep === 1
              ? { justifyContent: "flex-end" }
              : { justifyContent: "space-between" }
          }
        >
          <button
            onClick={() => dispatch(backStep())}
            className="btn btn-warning btn-back"
          >
            <FaChevronLeft /> Back
          </button>
          <button onClick={submitPayment} className="btn btn-success btn-next">
            Submit payment <FaCheck />
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderButtons;
