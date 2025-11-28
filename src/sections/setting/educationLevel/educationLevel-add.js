import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Grid2,
  Stack,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import { useFormik } from "formik";
import SnackbarAlert from "src/components/action-notification";
import * as Yup from "yup";
import {
  addEducationLevelApi,
  listEducationLevelApi,
} from "src/contexts/api/setting/api-educationlevel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EducationLevelAdd({ open, onClose }) {
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validationSchema = Yup.object({
    code: Yup.string().max(6).required("Vui lòng nhập thông tin vào trường này"),
    name: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  });

  const initialValues = {
    code: "",
    name: "",
    description: "",
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          educationLevelId: 1,
          code: values.code,
          name: values.name,
          description: values.description,
          field1: "1",
          field2: "1",
          field3: "1",
          field4: "1",
          field5: "1",
          timeStamp: Math.floor(new Date().getTime() / 1000),
          createdAt: new Date().toISOString(),
          createdBy: 1,
          createdByHidden: "1",
          lastModifiedAt: new Date().toISOString(),
          lastModifiedBy: 1,
          lastModifiedByHidden: "1",
          flag: "A",
        };

        const response = await addEducationLevelApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Thêm thành công !");
          setSnackbarOpen(true);

          formik.resetForm();

          //get list data after add
          const data = await listEducationLevelApi();
          // dispatch({
          //     type: HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL,
          //     payload: data.data,
          // })
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, md: 12, sm: 12 }}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              variant="outlined"
              label="Mã Trình Độ Văn Hóa"
              name="code"
              fullWidth
              error={!!(formik.touched.code && formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("code", e.target.value)}
              value={formik.values.code}
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              variant="outlined"
              label="Tên Trình Độ Văn Hóa"
              name="name"
              fullWidth
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              value={formik.values.name}
            />
            <TextField
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              variant="outlined"
              label="Mô Tả Chi Tiết"
              fullWidth
              name="description"
              value={formik.values.description}
              onChange={(e) => formik.setFieldValue("description", e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "neutral.main",
                }}
                onClick={formik.handleSubmit}
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
}
