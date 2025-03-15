import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "./CheckoutForm.scss";
import OrderButtons from "./OrderButtons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const submitPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    dispatch(showLoader(true));
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order",
      },
    });
    dispatch(showLoader(false));
    console.log(result, "result plcanja");

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(result.error.message);
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form>
      <PaymentElement />
      <OrderButtons submitPayment={submitPayment} />
    </form>
  );
};

export default CheckoutForm;
