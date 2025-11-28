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
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { AddCircleOutline, Error, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect } from "react";
import { listStatusByAliasApi } from "src/contexts/api/setting/api-status";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBasicInfo, selectSystemAccess } from "src/slices/account/accountSelector";
import { setErrorsAccountAsync, setInputAccountsAsync } from "src/slices/account/account";
import { actionSetTouched } from "./tab-infobasic";
import generateRandomNumber from "src/utils/generate-random-number";
import AccountGroupAddDialog from "../shared/account-group-add-dialog";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export function validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue, allValues) {
  const validationSchema = Yup.object().shape({
    lastName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    middleName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    firstName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    accountGroup: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    username: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[a-zA-Z0-9._]+$/, "Username không được chứa dấu cách hoặc ký tự đặc biệt"),
    password: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .max(40, "Mật khẩu tối đa là 40 ký tự"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
    status: Yup.string(),
    touched: Yup.object(),
    errors: Yup.object(),
  });

  const valuesToValidate = {
    ...allValues, // ✅ chứa toàn bộ field hiện tại
    [fieldName]: fieldValue, // cập nhật giá trị field đang thay đổi
  };

  let newValue;
  validationSchema
    .validateAt(fieldName, valuesToValidate)
    .then(() => {
      dispatch(setErrorsAccountAsync(tab, fieldName, null));
    })
    .catch((error) => {
      dispatch(setErrorsAccountAsync(tab, fieldName, error.message));
    });
}

export default function TabSystemAccess() {
  //context API
  const tab = "systemAccess";
  const dispatch = useDispatch();
  const systemAccess = useSelector(selectSystemAccess);
  const {
    lastName,
    middleName,
    firstName,
    accountGroup,
    username,
    password,
    confirmPassword,
    status,
    touched,
    errors,
  } = systemAccess;

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusEmployee, setStatusEmployee] = useState([]);
  const [accountGroupOptions, setAccountGroupOptions] = useState([
    "Hệ thống",
    "Quản lý",
    "Nhân viên",
  ]);
  const [openAccountGroupAddDialog, setOpenAccountGroupAddDialog] = useState(false);

  // Test
  async function mockCheckUsernameAvailability(username) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const available = Math.random() < 0.7;
        resolve({ available });
      }, 1000);
    });
  }

  async function checkUsernameAvailability(username) {
    setCheckingUsername(true);
    try {
      const data = await mockCheckUsernameAvailability(username);
      setUsernameAvailable(data.available);
    } catch {
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  }

  useEffect(() => {
    if (username) {
      checkUsernameAvailability(username);
    } else {
      setUsernameAvailable(null);
    }
  }, [username]);

  useEffect(() => {
    if (lastName && firstName) {
      // ✅ Sinh username theo thời gian thực
      const initials = `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}${
        middleName ? middleName.charAt(0).toLowerCase() : ""
      }`;

      const removeVietnameseTones = (initials) => {
        return initials
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D");
      };

      const generatedUsername = removeVietnameseTones(initials);

      // ✅ Sinh password theo thời gian thực
      const randomPassword = `${generateRandomNumber(4)}@`;

      dispatch(setInputAccountsAsync(tab, "username", generatedUsername));
      dispatch(setInputAccountsAsync(tab, "password", randomPassword));
      dispatch(setInputAccountsAsync(tab, "confirmPassword", randomPassword));
    }
    // ✅ Sinh accountCode theo thời gian thực
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    const generatedAccountCode = `ACC${year}${month}${day}_${hour}${minute}${second}`;
    const tabBasicInfo = "basicInfo";

    dispatch(setInputAccountsAsync(tabBasicInfo, "accountCode", generatedAccountCode));
  }, [firstName, middleName, lastName]);

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
    document.querySelector("[name='lastName']").value = lastName;
    document.querySelector("[name='middleName']").value = middleName;
    document.querySelector("[name='firstName']").value = firstName;
    document.querySelector("[name='username']").value = username;
    document.querySelector("[name='password']").value = password;
    document.querySelector("[name='confirmPassword']").value = confirmPassword;
  }, []);

  const handleAddNewGroup = (newGroup) => {
    if (!accountGroupOptions.includes(newGroup)) {
      setAccountGroupOptions((prev) => [...prev, newGroup]);
    }
  };

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

    validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue, {
      lastName,
      middleName,
      firstName,
      accountGroup,
      username,
      password,
      confirmPassword,
      status,
    });
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

    validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue, {
      lastName,
      middleName,
      firstName,
      accountGroup,
      username,
      password,
      confirmPassword,
      status,
    });
  };

  const handleChangeSelect = (event, fieldName, fieldValue) => {
    actionSetTouched(dispatch, tab, fieldName);

    const newValue =
      fieldValue &&
      (Array.isArray(fieldValue) ? fieldValue : fieldValue !== null ? fieldValue : "");

    dispatch(setInputAccountsAsync(tab, fieldName, newValue));
    validateFieldSystemAccess(dispatch, tab, fieldName, fieldValue, {
      lastName,
      middleName,
      firstName,
      accountGroup,
      username,
      password,
      confirmPassword,
      status,
    });
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
        <Grid2 item size={{ xs: 4, md: 4, sm: 4 }}>
          <TextField
            autoComplete="off"
            error={!!(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            onBlur={(event) => handleBlurChange(event, "lastName")}
            name="lastName"
            variant="outlined"
            fullWidth
            size="small"
            required
            label="Họ"
          />
        </Grid2>
        <Grid2 item size={{ xs: 4, md: 4, sm: 4 }}>
          <TextField
            error={!!(touched.middleName && errors.middleName)}
            helperText={touched.middleName && errors.middleName}
            onBlur={(event) => handleBlurChange(event, "middleName")}
            variant="outlined"
            fullWidth
            size="small"
            required
            label="Tên đệm"
            name="middleName"
          />
        </Grid2>
        <Grid2 item size={{ xs: 4, md: 4, sm: 4 }}>
          <TextField
            error={!!(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            onBlur={(event) => handleBlurChange(event, "firstName")}
            variant="outlined"
            fullWidth
            size="small"
            required
            label="Tên"
            name="firstName"
          />
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          {/* <TextField
            autoComplete="off"
            error={!!(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            onChange={(event) => handleChange(event, "username")}
            value={username}
            variant="outlined"
            label="Tên tài khoản"
            size="small"
            fullWidth
            name="username"
            sx={{ flex: 1, mr: 1 }}
          /> */}
          <TextField
            label="Username"
            name="username"
            size="small"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(event) => handleChange(event, "username")}
            error={!!errors.username || usernameAvailable === false}
            helperText={
              errors.username
                ? errors.username
                : usernameAvailable === false
                ? "Username đã tồn tại, vui lòng chọn username khác"
                : ""
            }
            slotProps={{
              input: {
                endAdornment: checkingUsername ? (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ) : usernameAvailable === true ? (
                  <InputAdornment position="end">
                    <CheckCircleIcon style={{ color: "green" }} />
                  </InputAdornment>
                ) : usernameAvailable === false ? (
                  <InputAdornment position="end">
                    <Error style={{ color: "red" }} />
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Autocomplete
              multiple
              limitTags={4}
              value={accountGroup || []}
              onChange={(event, newValue) => handleChangeSelect(event, "accountGroup", newValue)}
              options={accountGroupOptions}
              size="small"
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Nhóm tài khoản" />
              )}
              sx={{ flexGrow: 1 }}
            />

            {/* ✅ Nút thêm nhóm mới */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Thêm nhóm tài khoản" arrow>
                <IconButton color="primary" onClick={() => setOpenAccountGroupAddDialog(true)}>
                  <AddCircleOutline />
                </IconButton>
              </Tooltip>
            </Box>
            <AccountGroupAddDialog
              open={openAccountGroupAddDialog}
              onClose={() => setOpenAccountGroupAddDialog(false)}
              onAdd={handleAddNewGroup}
            />
          </Box>
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
                <FormControl fullWidth variant="outlined" sx={{ marginRight: "20px" }}>
                  <InputLabel size="small" htmlFor="outlined-adornment-password">
                    Mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => handleChange(event, "password")}
                    name="password"
                    bạn
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
                    value={confirmPassword}
                    onChange={(event) => handleChange(event, "confirmPassword")}
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
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
            </Box>
            <FormLabel>Trạng thái</FormLabel>
            <RadioGroup
              row
              name="status"
              value={status}
              onChange={(event) => handleChange(event, "status")}
            >
              <FormControlLabel
                value="isActive"
                control={<Radio size="small" />}
                label="Đang hoạt động"
              />
              <FormControlLabel value="locked" control={<Radio size="small" />} label="Khóa" />
            </RadioGroup>
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
