import { Autocomplete, Button, Grid2, Stack, TextField, styled } from "@mui/material";
import { Box } from "@mui/system";
import { Add, CloudUpload } from "@mui/icons-material";
import { useFormik } from "formik";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ExamFieldAdd() {
  const [selectedFileGiayKinhDoanh, setSelectedFileGiayKinhDoanh] = useState(null);

  const formik = useFormik({
    initialValues: {
      tenLinhVuc: "",
      monThi: "",
      ghiChu: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
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

  const handleFileChangeGiayKinhDoanh = async (event) => {
    const file = event.target.files[0];

    // const response = await uploadSingleFile("Company", file);
    // if (response.status === 200) {
    //     setSnackbarSeverity("success");
    //     setSnackbarMessage("Tải file lên thành công.");
    //     setSnackbarOpen(true);

    //     getPathFromUrl(response.data);

    //     setSelectedFileGiayKinhDoanh(file);
    //     formik.setFieldValue('fileThongTin', getPathFromUrl(response.data));
    // } else {
    //     setSnackbarSeverity("error");
    //     setSnackbarMessage("Tải file lên thất bại.");
    //     setSnackbarOpen(true);
    // }
  };

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          margin: "38px 0",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <TextField
            error={!!(formik.touched.tenLinhVuc && formik.errors.tenLinhVuc)}
            helperText={formik.touched.tenLinhVuc && formik.errors.tenLinhVuc}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.tenLinhVuc}
            name="tenLinhVuc"
            required
            sx={{ margin: "4px", marginTop: "12px" }}
            size="small"
            label="Tên lĩnh vực"
            fullWidth
            variant="outlined"
          />
          <TextField
            error={!!(formik.touched.monThi && formik.errors.monThi)}
            helperText={formik.touched.monThi && formik.errors.monThi}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.monThi}
            name="monThi"
            sx={{ margin: "4px", marginTop: "12px" }}
            size="small"
            label="Hình thức thi"
            fullWidth
            variant="outlined"
          />
          <TextField
            error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            multiline
            rows={2}
            value={formik.values.ghiChu}
            name="ghiChu"
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
              }}
              type="submit"
            >
              Thêm
            </Button>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
