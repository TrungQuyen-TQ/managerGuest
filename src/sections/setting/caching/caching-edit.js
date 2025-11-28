/* eslint-disable react/jsx-max-props-per-line */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  DialogContent,
  IconButton,
  DialogTitle,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { SvgIcon } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useTranslation } from "react-i18next";
import BootstrapDialog from "src/components/bootstrap-dialog";
import dayjs from "dayjs";
import { Refresh } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

export default function CachingEdit({ open, onClose, rowData }) {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      objectName: "",
      key: uuidv4(),
      year: dayjs().year(),
      status: "Unactive",
    },
    // validationSchema: Yup.object({}),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setformik.Errors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (rowData) {
      formik.setValues({
        vocabulary: rowData.vocabulary || "",
        objectName: rowData.objectName || "",
        key: rowData.key || uuidv4(),
        year: rowData.year || dayjs().year(),
        status: rowData.status || "Unactive",
      });
    }
  }, [rowData]);

  const handleGenerateNewKey = () => {
    formik.setFieldValue("key", uuidv4());
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open} minWidth="800px">
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "neutral.main", color: "white" }}>
        {t("MEC_ADD_CACHING")}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
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
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <TextField
            autoComplete="off"
            variant="outlined"
            required
            sx={{ marginTop: "12px" }}
            size="small"
            fullWidth
            label="Tên đối tượng"
            name="objectName"
            value={formik.values.objectName}
            onChange={formik.handleChange}
            error={formik.touched.objectName && Boolean(formik.errors.objectName)}
            helperText={formik.touched.objectName && formik.errors.objectName}
          />
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel size="small" htmlFor="outlined-adornment-key">
              Key
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-key"
              type="text"
              value={formik.values.key}
              label="key"
              name="key"
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleGenerateNewKey} edge="end">
                    <Refresh />
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.key && formik.errors.key && (
              <FormHelperText error>{formik.errors.key}</FormHelperText>
            )}
          </FormControl>
          <FormLabel>Trạng thái</FormLabel>
          <RadioGroup row name="status" value={formik.values.status} onChange={formik.handleChange}>
            <FormControlLabel value="Active" control={<Radio size="small" />} label="Active" />
            <FormControlLabel value="Unactive" control={<Radio size="small" />} label="Unactive" />
          </RadioGroup>
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
