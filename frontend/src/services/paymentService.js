import axios from "axios";

export const makePayment = async (paymentInfo) => {
  try {
    const res = await axios.post("/api/v1/payment", paymentInfo);
    // console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        clientSecret: res.data.clientSecret,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa make payment");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Make payment failed. Please try again.",
    };
  }
};
