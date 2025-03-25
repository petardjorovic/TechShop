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
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
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
  } catch (error) {
    return {
      status: error.response.data.err.status,
      message: error.response.data.message,
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
      status: err.response.data.err.status,
      message: err.response.data.message,
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
      status: err.response.data.err.status,
      message: err.response.data.message,
    };
  }
};
