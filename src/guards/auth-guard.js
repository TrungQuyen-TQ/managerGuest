// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import PropTypes from "prop-types";
// import { selectAuth } from "src/slices/auth/authSelector";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { decryptPermissions, parseJwt } from "src/utils/token-utils";
// import { authenticateUser } from "src/slices/auth/auth";

// export const AuthGuard = (props) => {
//   const dispatch = useDispatch();
//   const { children } = props;
//   const router = useRouter();
//   const auth = useSelector(selectAuth);
//   const ignore = useRef(false);
//   const [checked, setChecked] = useState(false);

//   function useDecryptedPermissions() {
//     const token = auth.token;
//     const kb = "yJ8GivL/wZ8+2VhKy2RGGvBYy8SfuJqB3gwKep9PNtE="; // key giải mã AES của bạn

//     if (!token) return null;

//     const payload = parseJwt(token);

//     if (!payload?.dp) return null;

//     try {
//       const decryptedPermissions = decryptPermissions(payload.dp, kb);
//       return decryptedPermissions;
//     } catch (error) {
//       console.error("Giải mã thất bại:", error);
//       return null;
//     }
//   }
//   const decryptedPermissions = useDecryptedPermissions();
//   console.log(decryptedPermissions);

//   // Only do authentication check on component mount.
//   // This flow allows you to manually redirect the user after sign-out, otherwise this will be
//   // triggered and will automatically redirect to sign-in page.

//   useEffect(() => {
//     if (!router.isReady || ignore.current) return;
//     ignore.current = true;

//     const initAuth = async () => {
//       await dispatch(authenticateUser());

//       const { token, user } = auth;
//       if (!token || !user) {
//         router.replace({
//           pathname: "/auth/login",
//           query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
//         });
//         return;
//       }

//       const expiryTime = user?.exp ? user.exp * 1000 : 0;
//       if (Date.now() >= expiryTime) {
//         console.log("Token expired sau khi refresh, redirect login...");
//         router.replace("/auth/login");
//         return;
//       }

//       setChecked(true);
//     };

//     initAuth();
//   }, [router.isReady]);

//   if (!checked) {
//     return null;
//   }

//   // If got here, it means that the redirect did not occur, and that tells us that the user is
//   // authenticated / authorized.

//   return children;
// };

// AuthGuard.propTypes = {
//   children: PropTypes.node,
// };

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { selectAuth } from "src/slices/auth/authSelector";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const isAuthenticated = Cookies.get("authenticated") === "true";
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    const checkAuthExpiration = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      if (auth?.user?.exp && auth.user.exp <= currentTime) {
        console.log("Token expired, logging out");
        Cookies.remove("authenticated"); // Xóa cookie khi hết hạn
        router
          .replace({
            pathname: "/auth/login",
            query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
          })
          .catch(console.error);
        return;
      }
      setChecked(true);
    };

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth/login",
          query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      checkAuthExpiration();
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
