import axios from "axios";

export const addProductComment = async (comment) => {
  try {
    const res = await axios.post("/api/v1/comment", comment);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa add product comment");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Add product comment failed. Please try again.",
    };
  }
};

export const getProductComments = async (productId) => {
  try {
    const res = await axios.get(`/api/v1/comment/filter/${productId}`);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        allComments: res.data.allComments,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa get product comments");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Request failed. Please try again.",
    };
  }
};

export const getAllComments = async () => {
  try {
    const res = await axios.get("/api/v1/comment");
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        allComments: res.data.allComments,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa get all comment");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Request failed. Please try again.",
    };
  }
};

export const changeCommentStatus = async (comment) => {
  try {
    const res = await axios.patch("/api/v1/comment", comment);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa change comment status");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Change comment status failed. Please try again.",
    };
  }
};

export const deleteComment = async (commentId) => {
  try {
    const res = await axios.delete(`/api/v1/comment/${commentId}`);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa delete comment");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Delete comment failed. Please try again.",
    };
  }
};
