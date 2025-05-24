import axios from "axios";

export const register = async (user) => {
  try {
    const res = await axios.post("/api/v1/user/register", user);
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
    console.error(err, "err iz servisa register");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Register failed. Please try again.",
    };
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post("/api/v1/user/login", user);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        user: res.data.user,
        token: res.data.token,
      };
    }
    return {
      status: res.data.err.status,
      message: res.data.message,
    };
  } catch (err) {
    console.error(err, "err iz servisa login");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Register failed. Please try again.",
    };
  }
};

export const changeUserPassword = async (passwords) => {
  try {
    const res = await axios.patch("/api/v1/user/changePassword", passwords);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa change password");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Change password failed. Please try again.",
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post("/api/v1/user/forgotPassword", { email });
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
    return res;
  } catch (err) {
    console.error(err, "err iz servisa forgot password");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Forgot password failed. Please try again.",
    };
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios.patch(
      `/api/v1/user/resetPassword/${data.token}`,
      data.values
    );
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa reset password");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Reset password failed. Please try again.",
    };
  }
};

export const editUserProfile = async (data) => {
  try {
    const res = await axios.put("/api/v1/user/editUser", data);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa edit user");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Edit user profile failed. Please try again.",
    };
  }
};

export const getSingleUser = async () => {
  try {
    const res = await axios.get(`/api/v1/user/getSingleUser`);
    if (res.status === 200 && res.data.status === "success") {
      return {
        status: res.data.status,
        user: res.data.user,
      };
    }
  } catch (err) {
    console.error(err, "err iz servisa get user");
    return {
      status: err.response?.data?.error?.status || "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "Request failed. Please try again.",
    };
  }
};
