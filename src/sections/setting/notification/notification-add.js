/* eslint-disable react/jsx-max-props-per-line */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  DialogContent,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useTranslation } from "react-i18next";
import BootstrapDialog from "src/components/bootstrap-dialog";
import dayjs from "dayjs";

export default function NotificationAdd({ open, onClose }) {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "Đơn hàng",
      isNotificationOn: true,
      status: "Active",
      createdAt: dayjs().toISOString(),
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tiêu đề"),
      type: Yup.string().required("Vui lòng chọn loại thông báo"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values); // call API add ở đây
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm thông báo thành công!");
        setSnackbarOpen(true);
        onClose();
      } catch (err) {
        helpers.setStatus({ success: false });
        setSnackbarSeverity("error");
        setSnackbarMessage("Có lỗi xảy ra khi thêm thông báo");
        setSnackbarOpen(true);
        helpers.setSubmitting(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open} minWidth="800px" title={"Thêm thông báo"}>
      <DialogContent dividers>
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          {/* Tiêu đề */}
          <TextField
            autoComplete="off"
            variant="outlined"
            required
            sx={{ marginTop: "12px" }}
            size="small"
            fullWidth
            label="Tiêu đề thông báo"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          {/* Loại thông báo */}
          <FormControl fullWidth sx={{ mt: 2 }} size="small">
            <FormLabel>Loại thông báo</FormLabel>
            <Select name="type" value={formik.values.type} onChange={formik.handleChange}>
              <MenuItem value="Đơn hàng">Đơn hàng</MenuItem>
              <MenuItem value="Học viên">Học viên</MenuItem>
              <MenuItem value="Giáo viên">Giáo viên</MenuItem>
              <MenuItem value="Nhân viên">Nhân viên</MenuItem>
              <MenuItem value="Hệ thống">Hệ thống</MenuItem>
              <MenuItem value="Cảnh báo">Cảnh báo</MenuItem>
              <MenuItem value="Khuyến mãi">Khuyến mãi</MenuItem>
            </Select>
          </FormControl>

          {/* Bật/tắt âm báo */}
          <Box sx={{ mt: 2 }}>
            <FormLabel>Âm báo</FormLabel>
            <Switch
              checked={formik.values.isNotificationOn}
              onChange={(e) => formik.setFieldValue("isNotificationOn", e.target.checked)}
              name="isNotificationOn"
            />
          </Box>

          {/* Trạng thái */}
          <FormLabel sx={{ mt: 2 }}>Trạng thái</FormLabel>
          <RadioGroup row name="status" value={formik.values.status} onChange={formik.handleChange}>
            <FormControlLabel value="Active" control={<Radio size="small" />} label="Active" />
            <FormControlLabel value="Unactive" control={<Radio size="small" />} label="Unactive" />
          </RadioGroup>

          {/* Nút thêm */}
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
              type="submit"
              onClick={formik.handleSubmit}
            >
              Thêm
            </Button>
          </Box>
        </Box>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </DialogContent>
    </BootstrapDialog>
  );
}
