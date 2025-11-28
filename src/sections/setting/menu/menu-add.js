import React, { useState } from "react";
import { TextField, Grid2, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Save } from "@mui/icons-material";

export default function MenuAdd() {
  const validationSchema = Yup.object({
    // parentId: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    menuName: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    menuOrder: Yup.number().typeError("Vui lòng nhập số trường này."),
    menuIcon: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    menuLink: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    description: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  });

  const initialValues = {
    menuName: "",
    parentId: "",
    menuOrder: "",
    menuIcon: "",
    menuLink: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        console.log("giá trị bạn vừa nhập vào là :", values);
        formik.resetForm();
      } catch (err) {
        console.error("Lỗi");
      }
    },
  });

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <form onSubmit={formik.handleSubmit}>
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
                Thông tin
              </Typography>
              <TextField
                error={formik.touched.menuName && Boolean(formik.errors.menuName)}
                helperText={formik.touched.menuName && formik.errors.menuName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.menuName}
                name="menuName"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên"
                fullWidth
                variant="outlined"
              />
              <Autocomplete
                sx={{ marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Mẫu 1", "Mẫu 2", "Mẫu 3"]}
                value={formik.values.parentId}
                onChange={(_, newValue) => {
                  formik.setFieldValue("parentId", newValue || null);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Thuộc menu cha"
                    name="parentId"
                    onBlur={formik.handleBlur}
                    error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                    helperText={formik.touched.parentId && formik.errors.parentId}
                  />
                )}
              />
              <TextField
                error={formik.touched.menuOrder && Boolean(formik.errors.menuOrder)}
                helperText={formik.touched.menuOrder && formik.errors.menuOrder}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.menuOrder}
                name="menuOrder"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thứ tự hiển thị"
                fullWidth
                variant="outlined"
              />
              <TextField
                error={formik.touched.menuIcon && Boolean(formik.errors.menuIcon)}
                helperText={formik.touched.menuIcon && formik.errors.menuIcon}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.menuIcon}
                name="menuIcon"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Biểu tượng hiển thị"
                fullWidth
                variant="outlined"
              />
              <TextField
                error={formik.touched.menuLink && Boolean(formik.errors.menuLink)}
                helperText={formik.touched.menuLink && formik.errors.menuLink}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.menuLink}
                name="menuLink"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Địa chỉ liên kết"
                required
                fullWidth
                variant="outlined"
              />
              <TextField
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                multiline
                rows={2}
                value={formik.values.description}
                name="description"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Ghi chú"
                fullWidth
                variant="outlined"
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
                    color: "neutral.text",
                  }}
                  startIcon={<Save />}
                  onClick={formik.handleSubmit}
                >
                  Lưu
                </Button>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Stack>
  );
}
