import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Stack,
  Button,
  Dialog,
  IconButton,
  styled,
  DialogTitle,
  DialogContent,
  Box,
  Grid2,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import {
  listPaymentTypeApi,
  updatePaymentTypeApi,
} from "src/contexts/api/setting/api-payment-type";
import { Save } from "@mui/icons-material";
import EditConfirmAlert from "src/components/action-edit-approval";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PaymentTypeEdit({ open, closeEdit, id }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  //Alert Confirm Edit
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleModelOpen = () => {
    setIsEditDialog(true);
  };

  const handleModelClose = () => {
    setIsEditDialog(false);
  };

  // khi người dùng ấn thoát
  const handleCancelSave = () => {
    handleModelClose();
  };

  // khi người dùng xác định lưu
  const handleConfirmSave = () => {
    setIsEditing(true);
    handleModelClose();
    formik.handleSubmit();
  };
  //end

  const paymentTypeEdit = [];

  const handleClose = (isEvent) => {
    closeEdit(isEvent);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    tenHangMuc: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  });

  const formik = useFormik({
    initialValues: {
      tenHangMuc: "",
      ghiChu: "",
      submit: null,
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          PaymentTypeId: id,
          PaymentTypeName: values.tenHangMuc,
          Description:
            values.ghiChu || "Theo dõi và quản lý tài khoản thanh toán một cách hiệu quả",
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: 1,
          CreatedByHidden: "1",
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: 1,
          LastModifiedByHidden: "1",
          Flag: "1",
        };

        if (isEditing) {
          const response = await updatePaymentTypeApi(formData);
          if (response.status === 200) {
            formik.resetForm();
            const listData = await listPaymentTypeApi();
            // dispatch({
            //     type: HANDLERS_PAYMENT_TYPE.LIST_PAYMENT_TYPE,
            //     payload: listData.data
            // })
            handleClose(true);
            setIsEditing(false);
          } else {
            setIsEditing(false);
            setSnackbarSeverity("error");
            setSnackbarMessage("Có lỗi xảy ra !");
            setSnackbarOpen(true);
          }
        } else {
          handleModelOpen();
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  // Lấy dữ liệu từ bảng
  useEffect(() => {
    const fetchPaymentTypeData = async () => {
      try {
        formik.setValues({
          tenHangMuc: paymentTypeEdit.paymentTypeName || "",
          ghiChu: paymentTypeEdit.description || "",
        });
      } catch (error) {
        console.error("Đã có lỗi xảy ra. Vui lòng kiểm tra lại !!!!");
      }
    };
    if (open && id) {
      fetchPaymentTypeData();
    }
  }, [open, id]);

  return (
    <BootstrapDialog onClose={() => handleClose(false)} open={open} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "neutral.main", color: "white" }}>
        Chỉnh sửa hạng mục thanh toán
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <SvgIcon fontSize="inherit">
          <XCircleIcon />
        </SvgIcon>
      </IconButton>
      <DialogContent dividers>
        <Box sx={{ typography: "body1" }}>
          <Grid2 container>
            <TextField
              error={!!(formik.touched.tenHangMuc && formik.errors.tenHangMuc)}
              helperText={formik.touched.tenHangMuc && formik.errors.tenHangMuc}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenHangMuc}
              name="tenHangMuc"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên hạng mục"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
              helperText={formik.touched.ghiChu && formik.errors.ghiChu}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ghiChu}
              name="ghiChu"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />
          </Grid2>
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
              startIcon={<Save />}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
      <EditConfirmAlert
        onOpen={isEditDialog}
        onClose={handleModelClose}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </BootstrapDialog>
  );
}
