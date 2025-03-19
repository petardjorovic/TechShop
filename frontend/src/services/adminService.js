import axios from "axios";

export const addProduct = async (product) => {
  try {
    const res = await axios.post("/api/v1/admin/product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
    return {
      status: res.data.err.status,
      message: res.data.message,
    };
  } catch (error) {
    console.log(error, "err iz servisa");
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
    };
  }
};

export const deleteProduct = async ({ productId, productImage }) => {
  try {
    const res = await axios.delete(
      `/api/v1/admin/product/${productId}/${productImage}`
    );
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};

export const editSingleProduct = async (product) => {
  try {
    const res = await axios.put("/api/v1/admin/product", product);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};
