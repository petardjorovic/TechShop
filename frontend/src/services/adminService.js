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
    console.error(error, "err iz servisa");
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

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/api/v1/admin/user");
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        allUsers: res.data.allUsers,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa all users");
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await axios.delete(`/api/v1/admin/user/${userId}`);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa delete user");
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};

export const addCategory = async (categoryName) => {
  try {
    const res = await axios.post("/api/v1/admin/category", { categoryName });
    if (res.status === 200 && res.data.status) {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa add category");
    return {
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};
