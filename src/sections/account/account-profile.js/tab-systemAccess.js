/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import "dayjs/locale/en-gb";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { Autocomplete, Grid2, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect } from "react";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSystemAccess } from "src/slices/account/accountSelector";
import { setInputAccountsAsync } from "src/slices/account/account";

export function validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue) {
  if (fieldName === "password") {
    filedValuePassword = fieldValue;
  }
  const validationSchema = Yup.object().shape({
    accountCode: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    accountGroup: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    userName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    password: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .max(40, "Mật khẩu tối đa là 40 ký tự"),
    confirmPassword: Yup.string()
      .required("Xác nhận mật khẩu là trường bắt buộc")
      .max(40, "Mật khẩu tối đa là 40 ký tự")
      .test("is-greater", "Mật khẩu không trùng khớp", (value) => {
        return value === filedValuePassword;
      }),
    status: Yup.string(),
    touched: Yup.object(),
    errors: Yup.object(),
  });

  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch(setErrorsAccountAsync(tab, fieldName, newValue));
    })
    .catch((error) => {
      newValue = error.message;
      dispatch(setErrorsAccountAsync(tab, fieldName, newValue));
    });
}

export default function TabSystemAccess() {
  //context API
  const tab = "systemAccess";
  const dispatch = useDispatch();
  const systemAccess = useSelector(selectSystemAccess);
  const {
    accountCode,
    accountGroup,
    userName,
    password,
    confirmPassword,
    status,
    touched,
    errors,
  } = systemAccess;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusEmployee, setStatusEmployee] = useState([]);

  //listStatus
  useEffect(() => {
    const listData = async () => {
      const res = await listStatusByAliasApi("trang-thai-nhan-vien");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const data = res.data.map((com) => ({
          label: com.statusName,
          value: com.commonStatusId,
        }));
        setStatusEmployee(data);
      }
    };
    listData();
  }, []);

  //Bắt được value tương ứng của từng field
  useEffect(() => {
    document.querySelector("[name='userName']").value = userName;
    document.querySelector("[name='password']").value = password;
    document.querySelector("[name='confirmPassword']").value = confirmPassword;
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
    } else {
      newValue = "";
    }
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue);
  };

  const handleBlurChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
    } else {
      newValue = "";
    }
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue);
  };

  const handleChangeSelect = (event, fieldName, fieldValue) => {
    actionSetTouched(dispatch, tab, fieldName);

    let newValue;

    if (fieldValue !== null) {
      newValue = fieldValue;
    } else {
      newValue = "";
    }
    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldSystemAccess(dispatch, tab, fieldName, newValue);
  };

  return (
    <Stack
      spacing={3}
      sx={{
        borderRadius: "6px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          <TextField
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            value={accountCode}
            name="accountCode"
            variant="outlined"
            fullWidth
            size="small"
            required
            label="Mã tài khoản"
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          <Autocomplete
            onChange={(event, newValue) => handleChangeSelect(event, "accountGroup", newValue)}
            value={accountGroup}
            options={["Học viên", "Giảng viên", "Cộng tác viên", "Nhân viên", "Phụ huynh"]}
            size="small"
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="Nhóm tài khoản" />
            )}
          />
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 12, sm: 12 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              margin: "0 auto",
            }}
          >
            <TextField
              autoComplete="off"
              error={!!(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
              onBlur={(event) => handleBlurChange(event, "userName")}
              variant="outlined"
              label="Tên tài khoản"
              size="small"
              fullWidth
              name="userName"
              sx={{ flex: 1, mr: 1 }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  autoComplete="off"
                  fullWidth
                  sx={{ marginRight: "10px" }}
                  error={!!(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={(event) => handleBlurChange(event, "password")}
                  name="password"
                  variant="outlined"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Mật khẩu"
                />

                <TextField
                  autoComplete="off"
                  fullWidth
                  sx={{ marginLeft: "10px" }}
                  error={!!(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  onBlur={(event) => handleBlurChange(event, "confirmPassword")}
                  name="confirmPassword"
                  size="small"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Xác nhận mật khẩu"
                />
              </Box>
            </Box>
            <FormLabel>Trạng thái</FormLabel>
            <RadioGroup
              row
              name="status"
              value={status}
              onChange={(event) => handleChange(event, "status")}
            >
              {statusEmployee.length === 0 ? (
                <>
                  <FormControlLabel
                    value="isActive"
                    checked
                    control={<Radio size="small" />}
                    label="Đang hoạt động"
                  />
                  <FormControlLabel value="locked" control={<Radio size="small" />} label="Khóa" />
                </>
              ) : (
                statusEmployee.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value} // Chuyển giá trị sang chuỗi nếu cần thiết
                    control={<Radio size="small" />}
                    label={item.label}
                  />
                ))
              )}
            </RadioGroup>
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
