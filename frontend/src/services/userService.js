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
  } catch (error) {
    console.log(error, "greska iz servisa");
  }
};
