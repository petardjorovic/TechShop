import { loadStripe } from "@stripe/stripe-js";

const publishableKey =
  "pk_test_51R2rAoKY6U7g0Y2BCxydeBTi2RxGvdUCb3BhFNTj9h0qm9uOKRn4D4KmM8GJFScOcrM8XAoKVpKj7wY5HA48Yflz00UnwAr18X";
const stripePromise = loadStripe(publishableKey);

export default stripePromise;
