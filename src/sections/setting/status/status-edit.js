/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
// import { listEthnicApi, updateEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { listStatusApi, updateStatusApi } from "src/contexts/api/setting/api-status";
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

export default function StatusEdit({ open, onClose, id }) {
  // alert
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

  const dataEdit = [];

  const validationSchema = Yup.object({
    StatusName: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    ObjType: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
  });

  const initialValues = {
    StatusName: "",
    ObjType: "",
    Description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          Alias: "1",
          LastModifiedByHidden: "1",
          CreatedByHidden: "1",
          ObjType: values.ObjType.trim(),
          Flag: "1",
          CommonStatusId: id,
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          CreatedAt: dataEdit.createdAt,
          Field5: "1",
          Description: values.Description.trim(),
          StatusName: values.StatusName.trim(),
          CreatedBy: "1",
        };

        // console.log(formData);
        if (isEditing) {
          const response = await updateStatusApi(formData);
          if (response.status === 200) {
            // call api list after add success
            const res = await listStatusApi();
            // dispatch list data
            // dispatch({
            //     type: HANDLERS_STATUS.LIST_STATUS,
            //     payload: res.data,
            // });

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

  const handleClose = (isEvent) => {
    onClose(isEvent);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          StatusName: dataEdit.statusName || "",
          ObjType: dataEdit.objType || "",
          Description: dataEdit.description || "",
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có ID
    if (open && id) {
      fetchCompanyData();
    }
  }, [open, id]);

  return (
    <BootstrapDialog onClose={() => handleClose(false)} open={open} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "neutral.main", color: "white" }}>
        Chỉnh sửa
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
        <TextField
          error={formik.touched.ObjType && Boolean(formik.errors.ObjType)}
          helperText={formik.touched.ObjType && formik.errors.ObjType}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.ObjType}
          name="ObjType"
          required
          sx={{ marginTop: "18px" }}
          size="small"
          label="Loại"
          fullWidth
          variant="outlined"
        />
        <TextField
          error={formik.touched.StatusName && Boolean(formik.errors.StatusName)}
          helperText={formik.touched.StatusName && formik.errors.StatusName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.StatusName}
          name="StatusName"
          required
          sx={{ marginTop: "18px" }}
          size="small"
          label="Tên trạng thái"
          fullWidth
          variant="outlined"
        />
        <TextField
          error={formik.touched.Description && Boolean(formik.errors.Description)}
          helperText={formik.touched.Description && formik.errors.Description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          multiline
          rows={2}
          value={formik.values.Description}
          name="Description"
          sx={{ marginTop: "18px" }}
          size="small"
          label="Ghi chú"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          backgroundColor: "#e3e6e6",
        }}
      >
        <Button
          autoFocus
          onClick={formik.submitForm}
          variant="contained"
          sx={{ background: "neutral.main" }}
          startIcon={<Save />}
        >
          Lưu
        </Button>
      </DialogActions>
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
