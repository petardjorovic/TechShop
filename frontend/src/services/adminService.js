import axios from "axios";

export const addProduct = async (product) => {
  try {
    const res = await axios.post("/api/v1/admin/product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res, "res iz servisa");
    return res;
  } catch (error) {
    console.log(error, "err iz servisa");
    return error;
  }
};
