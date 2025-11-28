import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  SvgIcon,
  CardActions,
  IconButton,
  InputAdornment,
  FormControl,
  Grid2,
  TextField,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";

const Page = () => {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // console.log("ngoai", employees);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Mật khẩu hiện tại là bắt buộc"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .required("Mật khẩu mới là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const dataChangePass = {
        id: getAccountId(),
        newPassword: values.confirmPassword,
        oldPassword: values.currentPassword,
      };

      //   await changePassword(dataChangePass);

      //   await fetchData();

      setSnackbarMessage("Đổi mật khẩu thành công");
      setSnackbarSeverity("success");

      resetForm();
    } catch (error) {
      console.error("Error:", error);

      setSnackbarMessage(
        "Đổi mật khẩu thất bại. Vui lòng thử lại. " + error.response?.data?.message
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t("MEC_CHANGE_PASSWORD")} | Macaron</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={4}
          sx={{
            backdropFilter: "blur(6px)",
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
            position: "-webkit-sticky",
            position: "sticky",
            top: 0,
            padding: { xs: "10px 15px", sm: "15px 30px 8px" },
            height: { xs: "120px", sm: "64px" },
            zIndex: 1100,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h4">{t("MEC_CHANGE_PASSWORD")}</Typography>
            <Box sx={{ padding: "16px", border: "1px solid #ccc", borderRadius: "15px" }}>
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                      <Field
                        as={TextField}
                        type={showPassword.currentPassword ? "text" : "password"}
                        name="currentPassword"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleClickShowPassword("currentPassword")}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword.currentPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Mật khẩu hiện tại"
                        error={touched.currentPassword && !!errors.currentPassword}
                        helperText={touched.currentPassword && errors.currentPassword}
                        autoComplete="current-password"
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                      <Field
                        as={TextField}
                        type={showPassword.newPassword ? "text" : "password"}
                        name="newPassword"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleClickShowPassword("newPassword")}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Mật khẩu mới"
                        error={touched.newPassword && !!errors.newPassword}
                        helperText={touched.newPassword && errors.newPassword}
                        autoComplete="new-password"
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <Field
                        as={TextField}
                        type={showPassword.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleClickShowPassword("confirmPassword")}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Xác nhận mật khẩu mới"
                        error={touched.confirmPassword && !!errors.confirmPassword}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        autoComplete="new-password"
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                    <CardActions sx={{ p: 2, justifyContent: "end" }}>
                      <Button type="submit" variant="contained" disabled={isSubmitting}>
                        Xác nhận
                      </Button>
                    </CardActions>
                  </Form>
                )}
              </Formik>
            </Box>
          </Stack>
        </Stack>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
