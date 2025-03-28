import axios from "axios";

export const getAllCategories = async () => {
  try {
    const res = await axios.get("/api/v1/admin/category");
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        allCategories: res.data.allCategories,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa get all categories");
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};
