/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import {
  Box,
  Grid2,
  Stack,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import QRCode from "react-qr-code";
import * as Yup from "yup";
import dayjs from "dayjs";

const currentDate = dayjs(); // Lấy ngày hiện tại
const formattedDate = currentDate.format("DD/MM/YYYY");

const generateSecretKey = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let secretKey = "";
  for (let i = 0; i < 8; i++) {
    secretKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return secretKey;
};

export default function TabSecurity() {
  const formik = useFormik({
    initialValues: {
      qrCode: formattedDate,
      enableSecurity: false,
      secretKey: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);

        formik.resetForm();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setformik.Errors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.enableSecurity) {
      formik.setFieldValue("secretKey", generateSecretKey());
    } else {
      formik.setFieldValue("secretKey", "");
    }
  }, [formik.values.enableSecurity]);

  return (
    <>
      <Stack spacing={3}>
        <Grid2
          container
          spacing={2}
          sx={{
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "12px",
          }}
        >
          <Grid2 item size={{ xs: 12, md: 12, sm: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.enableSecurity}
                  onChange={formik.handleChange}
                  name="enableSecurity"
                  color="primary"
                />
              }
              label="Kích hoạt bảo mật 2 lớp"
            />
          </Grid2>

          {formik.values.enableSecurity && (
            <>
              <Grid2 item size={{ xs: 12, md: 12, sm: 12 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    label="Mã bí mật"
                    value={formik.values.secretKey}
                    sx={{ width: "20%", mr: 5 }}
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontSize: "12.5px", color: "#6C737F", margin: "15px 5px 10px" }}
                    >
                      Mã QR code:
                    </Typography>
                    <QRCode
                      value={formik.values.qrCode}
                      style={{
                        width: "135px",
                        height: "135px",
                      }}
                    />
                  </Box>
                </Box>
              </Grid2>
            </>
          )}
        </Grid2>
      </Stack>
    </>
  );
}
