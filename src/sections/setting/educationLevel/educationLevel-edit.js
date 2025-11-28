import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  SvgIcon,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
} from "@mui/material";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import SnackbarAlert from "src/components/action-notification";
import { Save } from "@mui/icons-material";
import {
  editEducationLevelApi,
  listEducationLevelApi,
} from "src/contexts/api/setting/api-educationlevel";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EducationLevelEdit({ open, onClose, id }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const dataEdit = [];
  const validationSchema = Yup.object({
    code: Yup.string().max(6).required("Vui lòng nhập thông tin vào trường này"),
    name: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  });

  const initialValues = {
    code: "",
    name: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          educationLevelId: id,
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

        const response = await editEducationLevelApi(formData);
        if (response.status === 200) {
          formik.resetForm();
          // call api list after add success
          const res = await listEducationLevelApi();
          // dispatch list data
          // dispatch({
          //     type: HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL,
          //     payload: res.data,
          // });
          handleClose(true);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          code: dataEdit.code || "",
          name: dataEdit.name || "",
          description: dataEdit.description || "",
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    if (open && id) {
      fetchCompanyData();
    }
  }, [open, id]);

  const handleClose = () => {
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
      <DialogContent dividers sx={{ overflowX: "hidden !important" }}>
        <TextField
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Mã Trình Độ Văn Hóa"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
          fullWidth
        />
        <TextField
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Tên Trình Độ Văn Hóa"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />
        <TextField
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Mô Tả Chi Tiết"
          name="description"
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
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
    </BootstrapDialog>
  );
}
