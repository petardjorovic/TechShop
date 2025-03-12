import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios.get("/api/v1/products");
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        products: res.data.products,
      };
    }
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};

export const getSingleProduct = async (productId) => {
  try {
    const res = await axios.get(`/api/v1/products/single/${productId}`);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        product: res.data.product,
      };
    }
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};
