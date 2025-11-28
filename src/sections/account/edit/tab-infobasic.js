/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-props-per-line */
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { FormHelperText, Grid2, Typography } from "@mui/material";
import useFetchLocation from "src/contexts/api/location-api";
import { listEducationLevelApi } from "src/contexts/api/setting/api-educationlevel";
import { listEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { getPathFromUrl } from "src/utils/get-path-from-url";
import { listOrganApi } from "src/contexts/api/setting/api-organ";
import { selectBasicInfo } from "src/slices/account/accountSelector";
import {
  setErrorsAccountAsync,
  setInputAccountsAsync,
  setTouchedAccountAsync,
} from "src/slices/account/account";
import { useSelector, useDispatch } from "react-redux";

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

export function actionSetTouched(dispatch, tab, fieldName) {
  const newValue = true;
  dispatch(setTouchedAccountAsync(tab, fieldName, newValue));
}

export function validateFieldInfobasic(dispatch, tab, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    // accountId: Yup.number(),
    selectedFile: Yup.string(),
    avatar: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    lastName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    middleName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    firstName: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    birthday: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
    sex: Yup.string().max(4000),
    nationality: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    mobilePhone: Yup.string()
      .max(4000)
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    educationLevelId: Yup.string().max(4000),
    marriedStatus: Yup.string().max(4000),
    ethnicity: Yup.object()
      .shape({
        value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    religion: Yup.string().max(4000),
    email: Yup.string()
      .max(4000)
      .email("Vui lòng nhập email đúng định dạng")
      .required("Vui lòng nhập thông tin vào trường này"),
    identification: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    identificationDate: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
    identificationLocation: Yup.object()
      .shape({
        value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    domicileCityId: Yup.object()
      .shape({
        value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    domicileDistrictId: Yup.object()
      .shape({
        value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    domicileWardId: Yup.object()
      .shape({
        value: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    normallyAddress: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
    temporaryAddress: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
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

export default function TabInfoBasic() {
  //context API
  const tab = "basicInfo";
  const dispatch = useDispatch();
  const basicInfo = useSelector(selectBasicInfo);
  const {
    selectedFile,
    avatar,
    lastName,
    middleName,
    firstName,
    birthday,
    sex,
    nationality,
    mobilePhone,
    educationLevelId,
    marriedStatus,
    ethnicity,
    religion,
    email,
    identification,
    identificationDate,
    identificationLocation,
    domicileCityId,
    domicileDistrictId,
    domicileWardId,
    normallyAddress,
    temporaryAddress,
    touched,
    errors,
  } = basicInfo;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [educationLevel, setEducationLevel] = useState([]);
  const [ethnic, setEthnic] = useState([]);
  const [marital, setMarital] = useState([]);
  const [officeOption, setOfficeOption] = useState([]);

  //Options location
  const { cities, districts, wards } = useFetchLocation(
    domicileCityId?.value,
    domicileDistrictId?.value
  );

  //listEducationLevel
  useEffect(() => {
    const listEducationLevelOption = async () => {
      const res = await listEducationLevelApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const edutcationLevels = res.data.map((com) => ({
          label: com.name,
          value: com.educationLevelId,
        }));
        setEducationLevel(edutcationLevels);
      }
    };
    listEducationLevelOption();
  }, []);

  // list ethnic
  useEffect(() => {
    const listEthnicOption = async () => {
      const res = await listEthnicApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const ethnic = res.data.map((com) => ({
          label: com.ethnicName,
          value: com.ethnicId,
        }));
        setEthnic(ethnic);
      }
    };
    listEthnicOption();
  }, []);

  //list office
  useEffect(() => {
    const listOfficeOption = async () => {
      const res = await listOrganApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const offices = res.data.map((office) => ({
          label: office.officeName,
          value: office.officeId,
        }));
        setOfficeOption(offices);
      }
    };
    listOfficeOption();
  }, []);

  useEffect(() => {
    document.querySelector("[name='lastName']").value = lastName;
    document.querySelector("[name='middleName']").value = middleName;
    document.querySelector("[name='firstName']").value = firstName;
    document.querySelector("[name='mobilePhone']").value = mobilePhone;
    document.querySelector("[name='email']").value = email;
    document.querySelector("[name='identification']").value = identification;
    document.querySelector("[name='normallyAddress']").value = normallyAddress;
    document.querySelector("[name='temporaryAddress']").value = temporaryAddress;
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

    validateFieldInfobasic(dispatch, tab, fieldName, fieldValue);
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

    validateFieldInfobasic(dispatch, tab, fieldName, fieldValue);
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

    validateFieldInfobasic(dispatch, tab, fieldName, newValue);
  };

  const handleChangeDate = (value, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
    const newValue = value;

    dispatch(setInputAccountsAsync(tab, fieldName, newValue));

    validateFieldInfobasic(dispatch, tab, fieldName, newValue);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file != null) {
      let newValue;
      let fieldName = "avatar";

      actionSetTouched(dispatch, tab, fieldName);

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        const response = await uploadSingleFile("Account", file);
        if (response.status === 200) {
          newValue = getPathFromUrl(response.data);

          reader.onload = (e) => {
            dispatch(setInputAccountsAsync(tab, fieldName, newValue));

            newValue = e.target.result;
            fieldName = "selectedFile";
            dispatch(setInputAccountsAsync(tab, fieldName, newValue));
          };
          reader.readAsDataURL(file);
        } else {
          console.log(response);
          setSnackbarSeverity("error");
          setSnackbarMessage("Thêm ảnh thất bại.");
          setSnackbarOpen(true);
          newValue = null;
        }
      } else {
        setSnackbarSeverity("warning");
        setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
        setSnackbarOpen(true);
        newValue = null;
      }
      validateFieldInfobasic(dispatch, tab, fieldName, newValue);
    }
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
  };

  return (
    <Stack spacing={3}>
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          {/* Thông tin cơ bản */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>

            <Grid2 container spacing={2}>
              <Grid2 item size={{ xs: 12, md: 4, sm: 4 }} style={{ marginBottom: "-20px" }}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: "120px",
                      height: "160px",
                    }}
                    variant="rounded"
                    src={"https://lotus.i.tisbase.online" + avatar || selectedFile}
                  ></Avatar>
                </Stack>
                <Button sx={{ width: "120px" }} component="label">
                  Tải ảnh lên
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    onBlur={() => handleBlur("avatar")}
                  />
                </Button>
                {touched.avatar && errors.avatar && (
                  <FormHelperText sx={{ color: "red" }}>{errors.avatar}</FormHelperText>
                )}
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 8, sm: 8 }}>
                <TextField
                  autoComplete="off"
                  error={!!(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  onBlur={(event) => handleBlurChange(event, "lastName")}
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: "15px" }}
                  size="small"
                  required
                  label="Họ"
                />
                <TextField
                  error={!!(touched.middleName && errors.middleName)}
                  helperText={touched.middleName && errors.middleName}
                  onBlur={(event) => handleBlurChange(event, "middleName")}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: "15px" }}
                  size="small"
                  required
                  label="Tên đệm"
                  name="middleName"
                />
                <TextField
                  error={!!(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  onBlur={(event) => handleBlurChange(event, "firstName")}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: "15px" }}
                  size="small"
                  required
                  label="Tên"
                  name="firstName"
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={2} style={{ marginTop: "20px", marginBottom: "10px" }}>
              <Grid2 item size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    onBlur={() => handleBlur("birthday")}
                    onChange={(value) => handleChangeDate(value, "birthday")}
                    value={birthday}
                    name="birthday"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        error: !!(touched.birthday && errors.birthday),
                        helperText: touched.birthday && errors.birthday,
                      },
                    }}
                    label="Ngày sinh"
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 item size={6} sx={{ marginTop: "-13px" }}>
                <FormLabel>Giới tính</FormLabel>
                <RadioGroup
                  row
                  name="sex"
                  value={sex}
                  onChange={(event) => handleChange(event, "sex")}
                >
                  <FormControlLabel value="Nam" control={<Radio size="small" />} label="Nam" />
                  <FormControlLabel value="Nữ" control={<Radio size="small" />} label="Nữ" />
                </RadioGroup>
              </Grid2>
            </Grid2>

            <Autocomplete
              onBlur={() => handleBlur("nationality")}
              onChange={(event, newValue) => handleChangeSelect(event, "nationality", newValue)}
              value={nationality}
              name="nationality"
              fullWidth
              size="small"
              sx={{ margin: "10px 0" }}
              options={["Việt Nam", "Nhật Bản", "Hàn Quốc", "Úc", "Mỹ"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quốc tịch"
                  variant="outlined"
                  error={!!(touched.nationality && errors.nationality)}
                  helperText={touched.nationality && errors.nationality}
                />
              )}
            />
            <TextField
              error={!!(touched.mobilePhone && errors.mobilePhone)}
              helperText={touched.mobilePhone && errors.mobilePhone}
              onBlur={(event) => handleBlurChange(event, "mobilePhone")}
              name="mobilePhone"
              variant="outlined"
              required
              size="small"
              label="Điện thoại di động"
              fullWidth
            />
            <TextField
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={(event) => handleBlurChange(event, "email")}
              name="email"
              variant="outlined"
              required
              sx={{ marginTop: "12px" }}
              size="small"
              label="Email"
              fullWidth
            />

            {/* Trình độ văn hóa */}
            <Autocomplete
              onChange={(event, newValue) =>
                handleChangeSelect(event, "educationLevelId", newValue.value)
              }
              value={educationLevelId}
              name="educationLevelId"
              fullWidth
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
              options={educationLevel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Trình độ văn hóa"
                  variant="outlined"
                  error={!!(touched.educationLevelId && errors.educationLevelId)}
                  helperText={touched.educationLevelId && errors.educationLevelId}
                />
              )}
            />
            <Autocomplete
              onChange={(event, newValue) =>
                handleChangeSelect(event, "marriedStatus", newValue.value)
              }
              value={marriedStatus}
              name="marriedStatus"
              fullWidth
              size="small"
              sx={{ margin: "4px", marginTop: "12px" }}
              options={marital}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tình trạng hôn nhân"
                  variant="outlined"
                  error={!!(touched.marriedStatus && errors.marriedStatus)}
                  helperText={touched.marriedStatus && errors.marriedStatus}
                />
              )}
            />
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "ethnicity", newValue)}
              value={ethnicity}
              name="ethnicity"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={ethnic}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Dân tộc" />}
            />
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "religion", newValue)}
              value={religion}
              name="religion"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Phật", "Không"]}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Tôn giáo" />
              )}
            />
          </Box>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 6, sm: 12 }}>
          {/* CCCD */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Căn cước công dân
            </Typography>

            <TextField
              error={!!(touched.identification && errors.identification)}
              helperText={touched.identification && errors.identification}
              onBlur={(event) => handleBlurChange(event, "identification")}
              name="identification"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số CCCD"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("identificationDate")}
                onChange={(value) => handleChangeDate(value, "identificationDate")}
                name="identificationDate"
                value={identificationDate}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.identificationDate && errors.identificationDate),
                    helperText: touched.identificationDate && errors.identificationDate,
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <Autocomplete
              onBlur={() => handleBlur("identificationLocation")}
              onChange={(event, newValue) =>
                handleChangeSelect(event, "identificationLocation", newValue)
              }
              value={identificationLocation}
              name="identificationLocation"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={officeOption}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Nơi cấp"
                  error={!!(touched.identificationLocation && errors.identificationLocation)}
                  helperText={touched.identificationLocation && errors.identificationLocation}
                />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("domicileCityId")}
              onChange={(event, newValue) => handleChangeSelect(event, "domicileCityId", newValue)}
              value={domicileCityId}
              name="domicileCityId"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tỉnh / TP Nguyên quán"
                  variant="outlined"
                  error={!!(touched.domicileCityId && errors.domicileCityId)}
                  helperText={touched.domicileCityId && errors.domicileCityId}
                />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("domicileWardId")}
              onChange={(event, newValue) => handleChangeSelect(event, "domicileWardId", newValue)}
              value={domicileWardId}
              name="domicileWardId"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={wards || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Xã / Phường Nguyên quán"
                  variant="outlined"
                  error={!!(touched.domicileWardId && errors.domicileWardId)}
                  helperText={touched.domicileWardId && errors.domicileWardId}
                />
              )}
            />
            <TextField
              error={!!(touched.normallyAddress && errors.normallyAddress)}
              helperText={touched.normallyAddress && errors.normallyAddress}
              onBlur={(event) => handleBlurChange(event, "normallyAddress")}
              name="normallyAddress"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ thường trú"
              fullWidth
            />
          </Box>

          {/* Address */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Địa chỉ
            </Typography>
            <TextField
              error={!!(touched.temporaryAddress && errors.temporaryAddress)}
              helperText={touched.temporaryAddress && errors.temporaryAddress}
              onBlur={(event) => handleBlurChange(event, "temporaryAddress")}
              name="temporaryAddress"
              required
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ tạm trú"
              fullWidth
            />
          </Box>
        </Grid2>
      </Grid2>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // Tự động ẩn sau 2 giây
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Vị trí ở góc dưới bên phải
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
