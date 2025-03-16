import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../config/stripeConfig";
import { showLoader } from "../../store/loader/loaderSlice";
import { makePayment } from "../../services/paymentService";
import CheckoutForm from "./CheckoutForm";
import AddressForm from "./AddressForm";

function OrderProcessStepThree() {
  const [secretKey, setSecretKey] = useState("");
  const { cart } = useSelector((state) => state.cartStore);
  const { currency } = useSelector((state) => state.currencyStore);
  const dispatch = useDispatch();

  const options = {
    // passing the client secret obtained from the server
    clientSecret: secretKey,
  };

  useEffect(() => {
    let total = cart.reduce((total, item) => total + item.totalAmount, 0);
    if (currency === "USD") total = total * 1.09;
    if (currency === "RSD") total = total * 117;
    if (currency === "EUR") total = total;

    const fetchPayment = async () => {
      dispatch(showLoader(true));
      const res = await makePayment({ amount: total, currency });
      dispatch(showLoader(false));
      console.log(res);

      if (res.status === "success") setSecretKey(res.clientSecret);
    };
    fetchPayment();
  }, []);

  return (
    <>
      {secretKey && (
        <Elements stripe={stripePromise} options={options}>
          <AddressForm />
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default OrderProcessStepThree;
