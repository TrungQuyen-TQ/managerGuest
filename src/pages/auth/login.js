import { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthenticationQRCode from "../../components/authentication-qrcode";
import { useDispatch } from "react-redux";
import { logInUser } from "src/slices/auth/auth";
import { useModuleData } from "src/hooks/use-module-data";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data, tr } = useModuleData("auth/login");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [method, setMethod] = useState("username");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Vui lòng cung cấp tên đăng nhập"),
      password: Yup.string().max(255).required("Vui lòng cung cấp mật khẩu"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(logInUser(values.username, values.password));
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  if (!data) return null;
  const login = data.login;

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleQRPopupClose = () => {
    setShowQRPopup(false);
  };

  return (
    <>
      <Head>
        <title>{tr(login.pageTitle.key)}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundImage:
            "url('https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/2_11d9e3bcdfede9ce5ce5ace2d129f1c4.svg')",
        }}
      >
        <Stack
          sx={{
            background: "#f2f2f2",
          }}
        >
          <Box
            sx={{
              minWidth: "450px",
              minHeight: "500px",
              padding: "32px",
              border: "1px solid #ccc",
              width: "100%",
              backgroundColor: "#ffff",
              borderRadius: "8px",
              boxSizing: "border-box",

              boxShadow:
                "rgba(9,11,17,0.05) 0px 5px 15px 0px, rgba(19,23,32, 0.05) 0px 15px 35px -5px",
            }}
          >
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img alt="" src="/assets/logos/logo.png" style={{ width: "30%" }} />
              </Box>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={1}>
                <FormControl sx={{ marginTop: "20px" }}>
                  <FormLabel>{tr(login.usernameLabel.key)}</FormLabel>
                  <TextField
                    error={!!(formik.touched.username && formik.errors.username)}
                    fullWidth
                    variant="outlined"
                    helperText={formik.touched.username && formik.errors.username}
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.username}
                  />
                </FormControl>
                <FormControl sx={{}}>
                  <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                    <FormLabel>{tr(login.passwordLabel.key)}</FormLabel>
                    <Link
                      component="button"
                      variant="body2"
                      sx={{
                        alignSelf: "baseline",
                        color: "black",
                        "&:hover": {
                          color: "blue",
                          textDecoration: "underline", // Thêm gạch chân khi hover
                          backgroundColor: "lightgray", // Thêm màu nền khi hover
                        },
                      }}
                      underline="none"
                    >
                      {tr(login.forgotPassword.key)}
                    </Link>
                  </Box>
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    variant="outlined"
                    helperText={formik.touched.password && formik.errors.password}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </FormControl>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ backgroundColor: "neutral.main", mt: 5 }}
                type="submit"
                variant="contained"
              >
                {tr(login.loginButton.key)}
              </Button>
            </form>
          </Box>
        </Stack>
      </Box>
      <AuthenticationQRCode open={showQRPopup} onClose={handleQRPopupClose} />
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
