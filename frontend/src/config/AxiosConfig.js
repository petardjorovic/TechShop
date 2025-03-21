import axios from "axios";
import { getToken } from "../utils/getToken";
import { urlConfig } from "./urlConfig";

axios.defaults.baseURL = urlConfig.backend;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) config.headers.Authorization = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
