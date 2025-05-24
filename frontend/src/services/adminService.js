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
  } catch (err) {
    console.error(err, "err iz servisa add product");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Add product failed. Please try again.",
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
    console.error(err, "err iz servisa delete product");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Delete product failed. Please try again.",
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
    console.error(err, "err iz servisa edit single product");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Edit product failed. Please try again.",
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
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Request failed. Please try again.",
    };
  }
};

export const editUser = async (user) => {
  try {
    const res = await axios.put("/api/v1/admin/user", user);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "greska iz servisa edit user");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Edit user failed. Please try again.",
    };
  }
};

export const deleteUser = async (user) => {
  try {
    const res = await axios.delete(
      `/api/v1/admin/user/${user.userId}/${user.userAvatar}`
    );
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa delete user");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Delete user failed. Please try again.",
    };
  }
};

export const addCategory = async (categoryName) => {
  try {
    const res = await axios.post("/api/v1/admin/category", { categoryName });
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa add category");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Add category failed. Please try again.",
    };
  }
};

export const editCategory = async ({ id, categoryName }) => {
  try {
    const res = await axios.put("/api/v1/admin/category", { id, categoryName });
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa edit category");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Edit category failed. Please try again.",
    };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const res = await axios.delete(`/api/v1/admin/category/${categoryId}`);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa delete category");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Delete category failed. Please try again.",
    };
  }
};
