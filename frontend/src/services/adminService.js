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
