import { Autocomplete, Button, Stack, TextField, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const keyOption = [];

const validationSchema = Yup.object({
  key: Yup.object().required("Vui lòng nhập thông tin vào trường này"),
  value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
  description: Yup.string(),
});

export default function LanguageAdd() {
  const formik = useFormik({
    initialValues: {
      key: "",
      value: "",
      description: "",
    },
    validationSchema: validationSchema,
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
          <Autocomplete
            fullWidth
            size="small"
            sx={{ margin: "4px", marginTop: "12px" }}
            options={keyOption}
            onChange={(event, newValue) => formik.setFieldValue("key", newValue)}
            onBlur={() => formik.setFieldTouched("key", true)}
            value={formik.values.key}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Key"
                variant="outlined"
                error={formik.touched.key && Boolean(formik.errors.key)}
                helperText={formik.touched.key && formik.errors.key}
              />
            )}
          />
          <TextField
            error={!!(formik.touched.value && formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.value}
            name="value"
            sx={{ margin: "4px", marginTop: "12px" }}
            size="small"
            label="Value"
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
                color: "neutral.text",
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
