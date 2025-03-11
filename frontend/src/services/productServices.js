import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios.get("/api/v1/product");
    return {
      status: res.data.status,
      products: res.data.products,
    };
  } catch (error) {
    return {
      status: error.response.data.err.message,
      message: error.response.data.message,
    };
  }
};
