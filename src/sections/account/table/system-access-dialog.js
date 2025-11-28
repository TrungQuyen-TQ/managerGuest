import React, { useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  DialogContent,
  TextField,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  SvgIcon,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BootstrapDialog from "src/components/bootstrap-dialog";
import { useEffect } from "react";

const SystemAccessDialog = ({ open, onClose, rowData }) => {
  console.log(rowData);

  const [formData, setFormData] = useState({
    username: rowData?.userName || "",
    password: rowData?.password || "",
    confirmPassword: rowData?.password || "",
    status: rowData?.status || "isActive",
  });

  // --- EFFECT ---
  useEffect(() => {
    if (rowData) {
      setFormData({
        username: rowData.userName || "",
        password: rowData.password || "",
        confirmPassword: rowData.password || "",
        status: rowData.status || "isActive",
      });
    }
  }, [rowData]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // --- HANDLERS ---
  const handleChange = (event, field) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  const handleStatusChange = (event) => {
    setFormData((prev) => ({ ...prev, status: event.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Tên tài khoản là bắt buộc";
    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Form data:", formData);
      onClose(); // đóng dialog sau khi lưu thành công
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      title="Truy cập hệ thống"
      actions={
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ paddingX: "40px", fontSize: 16, backgroundColor: "#1C2536" }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </>
      }
    >
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            margin: "0 auto",
            maxWidth: "600px",
          }}
        >
          {/* Tên tài khoản */}
          <TextField
            variant="outlined"
            label="Tên tài khoản"
            fullWidth
            size="small"
            name="username"
            value={formData.username}
            onChange={(e) => handleChange(e, "username")}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />

          {/* Mật khẩu + Xác nhận mật khẩu */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl fullWidth variant="outlined" sx={{ marginRight: "20px" }}>
              <InputLabel size="small" htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange(e, "password")}
                name="password"
                label="Mật khẩu"
                error={touched.password && Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel size="small" htmlFor="outlined-adornment-confirm-password">
                Xác nhận mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e, "confirmPassword")}
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error>{errors.confirmPassword}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Trạng thái */}
          <FormLabel>Trạng thái</FormLabel>
          <RadioGroup row name="status" value={formData.status} onChange={handleStatusChange}>
            <FormControlLabel
              value="isActive"
              control={<Radio size="small" />}
              label="Đang hoạt động"
            />
            <FormControlLabel value="locked" control={<Radio size="small" />} label="Khóa" />
          </RadioGroup>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default SystemAccessDialog;
