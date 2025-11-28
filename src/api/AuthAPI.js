/* eslint-disable no-unused-vars */
import axiosInstance from "./config/axiosConfig";

// export const login = async (username, password) => {
//   try {
//     const response = await fetch("http://macaron.a.csoftlife.com/api/Auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     });

//     // Kiểm tra nếu request thất bại
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.message || "Lỗi khi gọi API");
//     }

//     // Trả về dữ liệu JSON
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Lỗi khi gọi API:", error);
//     throw error;
//   }
// };

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      username: username,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const refresh = async () => {
  try {
    const response = await axiosInstance.post("/refresh");
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const logout = async (token) => {
  try {
    const response = await axiosInstance.post("/service/logout", {
      token: token,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
