import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import QRCode from "react-qr-code";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useModuleData } from "src/hooks/use-module-data";
const LENGTH = 6;

export default function AuthenticationQRCode({ open, onClose }) {
  const { data, tr } = useModuleData("common");

  const inputRefs = React.useRef([]);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      otp: new Array(LENGTH).fill(""),
    },
    onSubmit: (values, helpers) => {
      // router.push("/field");
      router.push("/");
    },
  });

  if (!data) return null;
  const auth = data.components.authenticationQRCode;

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...formik.values.otp];
    // allow only one input
    newOtp[index] = value.substring(0, 1);
    formik.setFieldValue("otp", newOtp);

    // Move to next input if current field is filled
    if (value && index < LENGTH - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !formik.values.otp[index - 1]) {
      inputRefs.current[formik.values.otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !formik.values.otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    // Kiểm tra xem tất cả các ô input đều có giá trị và là số
    const isAllDigits = formik.values.otp.every((value) => !isNaN(value) && value !== "");

    // Kiểm tra xem có đủ 6 phần tử không
    const isLengthValid = formik.values.otp.length === LENGTH;

    if (!isAllDigits || !isLengthValid) {
      formik.setErrors({
        otp: tr(auth.error.invalidLength.key),
      });
      return;
    }

    // Kiểm tra xem OTP có đúng là "888888" hay không
    const isCorrectOTP = formik.values.otp.join("") === "888888";

    if (!isCorrectOTP) {
      formik.setErrors({
        otp: tr(auth.error.invalidOTP.key),
      });
      return;
    }

    formik.handleSubmit(); // Gọi handleSubmit của formik
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
            {tr(auth.title.key)}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <QRCode
              value="https://www.google.com/"
              style={{ width: "150px", height: "150px", marginBottom: "20px" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {formik.values.otp.map((value, index) => (
              <TextField
                key={index}
                inputRef={(input) => (inputRefs.current[index] = input)}
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                variant="outlined"
                style={{
                  width: "40px",
                  height: "40px",
                  margin: "5px",
                  textAlign: "center",
                  fontSize: "1.2em",
                }}
              />
            ))}
          </Box>
          {formik.errors.otp && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }} variant="body2">
              {formik.errors.otp}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" sx={{ margin: "5px", marginRight: "25px" }}>
            {tr(auth.button.confirm.key)}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
