import OrderProcessStepOne from "../../components/Order/OrderProcessStepOne";
import OrderProcessStepTwo from "../../components/Order/OrderProcessStepTwo";
import OrderProcessStepThree from "../../components/Order/OrderProcessStepThree";
import OrderButtons from "../../components/Order/OrderButtons";
import { useSelector } from "react-redux";

function OrderPage() {
  const { cart } = useSelector((state) => state.cartStore);
  const { currentStep } = useSelector((state) => state.orderStore);

  const displaySteps = () => {
    if (currentStep === 1) return <OrderProcessStepOne />;
    if (currentStep === 2) return <OrderProcessStepTwo />;
    if (currentStep === 3) return <OrderProcessStepThree />;
  };

  return (
    <div className="container">
      {displaySteps()}
      <OrderButtons />
    </div>
  );
}

export default OrderPage;
