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
  } catch (err) {
    console.error(err, "err iz servisa get all products");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Request failed. Please try again.",
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
  } catch (err) {
    console.error(err, "err iz servisa get single product");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Request failed. Please try again.",
    };
  }
};

export const rateSingleProduct = async (rate, productId) => {
  try {
    const res = await axios.patch("/api/v1/products/single", {
      productRate: rate,
      productId,
    });
    console.log(res, "res iz servisa rate single product");

    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
        user: res.data.user,
        product: res.data.product,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa rate product");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Rate product failed. Please try again.",
    };
  }
};
