import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import {
  Stack,
  SvgIcon,
  Grid2,
  TextField,
  Autocomplete,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
} from "@mui/material";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { Save } from "@mui/icons-material";
import {
  editConfigSystemApi,
  listConfigSystemApi,
} from "src/contexts/api/setting/api-configsystem";

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

export default function SystemEdit({ open, onClose, id }) {
  const [valueGroup, setvalueGroup] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const dataEdit = [];
  const validationSchema = Yup.object({
    configName: Yup.string().max(10).required("Vui lòng nhập thông tin vào trường này"),
    configAlias: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    configKey: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    configValue: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    configGroup: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  });

  const initialValues = {
    configName: "",
    configAlias: "",
    configKey: "",
    configValue: "",
    configGroup: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          configSystemId: dataEdit.configSystemId || "",
          configName: values.configName,
          configAlias: values.configAlias,
          configKey: values.configKey,
          configValue: values.configValue,
          configGroup: values.configGroup,
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

        const response = await editConfigSystemApi(formData);

        if (response.status === 200) {
          formik.resetForm();
          // call api list after add success
          const res = await listConfigSystemApi();

          // dispatch list data
          // dispatch({
          //     type: HANDLERS_CONFIGSYSTEM.LIST_CONFIGSYSTEM,
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
    const fetchConfigSystemData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          configSystemId: dataEdit.configSystemId || "",
          configName: dataEdit.configName || "",
          configAlias: dataEdit.configAlias || "",
          configKey: dataEdit.configKey || "",
          configValue: dataEdit.configValue || "",
          configGroup: dataEdit.configGroup || "",
          description: dataEdit.description || "",
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có ID
    if (open && id) {
      fetchConfigSystemData();
    }
  }, [open, id]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClose = (isEvent) => {
    onClose(isEvent);
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
          label="Tên Cấu Hình"
          fullWidth
          name="configName"
          value={formik.values.configName}
          onChange={formik.handleChange}
          error={formik.touched.configName && Boolean(formik.errors.configName)}
          helperText={formik.touched.configName && formik.errors.configName}
        />
        <TextField
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="configAlias"
          fullWidth
          name="configAlias"
          value={formik.values.configAlias}
          onChange={formik.handleChange}
          error={formik.touched.configAlias && Boolean(formik.errors.configAlias)}
          helperText={formik.touched.configAlias && formik.errors.configAlias}
        />
        <TextField
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="configKey"
          fullWidth
          name="configKey"
          value={formik.values.configKey}
          onChange={formik.handleChange}
          error={formik.touched.configKey && Boolean(formik.errors.configKey)}
          helperText={formik.touched.configKey && formik.errors.configKey}
        />
        <TextField
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Value"
          fullWidth
          name="configValue"
          value={formik.values.configValue}
          onChange={formik.handleChange}
          error={formik.touched.configValue && Boolean(formik.errors.configValue)}
          helperText={formik.touched.configValue && formik.errors.configValue}
        />
        <Autocomplete
          required
          sx={{ margin: "4px", marginTop: "12px" }}
          fullWidth
          size="small"
          options={["Nhật Bản", "Hàn Quốc", "Việt Nam"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Group"
              error={formik.touched.configGroup && Boolean(formik.errors.configGroup)}
              helperText={formik.touched.configGroup && formik.errors.configGroup}
            />
          )}
          value={formik.values.configGroup}
          onChange={(event, newValue) => {
            formik.setFieldValue("configGroup", newValue);
            setvalueGroup(newValue);
          }}
        />
        <TextField
          sx={{ margin: "4px", marginTop: "12px" }}
          size="small"
          variant="outlined"
          label="Giới Thiệu Chi Tiết"
          fullWidth
          value={formik.values.description}
          onChange={(e) => {
            formik.setFieldValue("description", e.target.value);
          }}
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
