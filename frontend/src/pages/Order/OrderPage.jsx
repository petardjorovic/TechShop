import OrderProcessStepOne from "../../components/Order/OrderProcessStepOne";
import OrderProcessStepTwo from "../../components/Order/OrderProcessStepTwo";
import OrderButtons from "../../components/Order/OrderButtons";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderPaymentMessage from "../../components/Order/OrderPaymentMessage";

function OrderPage() {
  const { cart } = useSelector((state) => state.cartStore);
  const { currentStep } = useSelector((state) => state.orderStore);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    // console.log(searchParams);
    if (searchParams.get("redirect_status")) {
      setPaymentMessage(searchParams.get("redirect_status"));
    }
  }, []);

  const displaySteps = () => {
    if (paymentMessage) {
      return <OrderPaymentMessage paymentMessage={paymentMessage} />;
    }
    if (currentStep === 1) return <OrderProcessStepOne />;
    if (currentStep === 2) return <OrderProcessStepTwo />;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 offset-2">
          {displaySteps()}
          {cart.length > 0 && currentStep !== 2 && <OrderButtons />}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
