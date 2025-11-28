// import { createSlice } from "@reduxjs/toolkit";
// import { login, refresh } from "src/api/AuthAPI";
// import { parseJwt } from "src/utils/token-utils";

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
//   token: null,
// };

// const slice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     initialize(state, action) {
//       const { user, token } = action.payload || {};
//       if (token && user) {
//         state.isAuthenticated = true;
//         state.user = user;
//         state.token = token;
//       } else {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//       }
//       state.isLoading = false;
//     },
//     signIn(state, action) {
//       const { user, token } = action.payload;
//       state.isAuthenticated = true;
//       state.user = user;
//       state.token = token;
//     },
//     signOut(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { reducer } = slice;

// //
// // ✅ Khi reload trang -> kiểm tra token trong cookie
// //
// export const authenticateUser = () => async (dispatch) => {
//   try {
//     const res = await refresh();
//     const { accessToken } = res.data;

//     if (!accessToken) {
//       console.log("Refresh token không hợp lệ → buộc đăng nhập lại");
//       dispatch(slice.actions.initialize(null));
//       return;
//     }

//     // Giải mã payload để lấy user info
//     const user = parseJwt(accessToken);

//     // Cập nhật Redux state
//     dispatch(slice.actions.initialize({ user, token: accessToken }));
//   } catch (err) {
//     console.error("Lỗi authenticateUser:", err);
//     dispatch(slice.actions.initialize(null));
//   }
// };

// //
// // ✅ Login
// //
// export const logInUser = (username, password) => async (dispatch) => {
//   try {
//     const res = await login(username, password);
//     // API trả về { accessToken }
//     const { accessToken } = res.data;

//     // Giải mã payload từ JWT để lấy user info (vd: userId, role,...)
//     const user = parseJwt(accessToken);

//     dispatch(slice.actions.signIn({ user, token: accessToken }));
//   } catch (err) {
//     console.error("Lỗi đăng nhập:", err);
//     throw err;
//   }
// };

// //
// // ✅ Logout
// //
// export const logOutUser = () => async (dispatch, getState) => {
//   try {
//     const { token } = getState().auth;
//     await logout(token);

//     dispatch(slice.actions.signOut());
//   } catch (err) {
//     console.error("Lỗi khi đăng xuất:", err);
//   }
// };

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize(state, action) {
      const user = action.payload;
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      }
      state.isLoading = false;
    },
    signIn(state, action) {
      const user = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { reducer } = slice;

export const authenticateUser = () => async (dispatch) => {
  try {
    const isAuthenticated = Cookies.get("authenticated") === "true";
    if (isAuthenticated) {
      const currentTime = Math.floor(Date.now() / 1000);
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Nguyễn Văn An",
        email: "anika.visser@devias.io",
        exp: currentTime + 600,
      };
      dispatch(slice.actions.initialize(user));
    } else {
      dispatch(slice.actions.initialize(null));
    }
  } catch (err) {
    console.error(err);
  }
};

export const logInUser = (email, password) => async (dispatch) => {
  if (email === "admin" && password === "admin123@") {
    const currentTime = Math.floor(Date.now() / 1000);
    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Nguyễn Văn An",
      email: "anika.visser@devias.io",
      exp: currentTime + 600,
    };
    Cookies.set("authenticated", "true");
    dispatch(slice.actions.signIn(user));
  } else {
    throw new Error("Vui lòng kiểm tra lại tên đăng nhập và mật khẩu");
  }
};

export const logOutUser = () => (dispatch) => {
  window.sessionStorage.removeItem("authenticated");
  dispatch(slice.actions.signOut());
};
