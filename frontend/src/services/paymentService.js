import axios from "axios";

export const makePayment = async (paymentInfo) => {
  try {
    const res = await axios.post("/api/v1/payment", paymentInfo);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        clientSecret: res.data.clientSecret,
      };
    }
  } catch (err) {
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};
