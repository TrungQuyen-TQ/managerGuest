// src/config/axiosConfig.js
import axios from "axios";
import Cookies from "js-cookie";

// Tạo instance của Axios với cấu hình cơ bản
const axiosInstance = axios.create({
  baseURL: "http://macaron.a.csoftlife.com/api/Auth",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Xử lý request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = Cookies.get("token");
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý response interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          console.error("Unauthorized access - token might be expired");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("An error occurred");
      }
    } else {
      console.error("Network error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
