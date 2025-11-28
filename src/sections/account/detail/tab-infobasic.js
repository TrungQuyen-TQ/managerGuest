/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { Box } from "@mui/system";
import {
  Typography,
  Stack,
  Avatar,
  TextField,
  Grid2,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import useFetchLocation from "src/contexts/api/location-api";
import { selectBasicInfo } from "src/slices/account/accountSelector";

export default function TabInfoBasic() {
  const basicInfo = useSelector(selectBasicInfo);
  const {
    avatar,
    selectedFile,
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
  } = basicInfo;

  const { cities, districts, wards } = useFetchLocation(
    domicileCityId?.value,
    domicileDistrictId?.value
  );

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
                  />
                </Stack>
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 8, sm: 8 }}>
                <TextField
                  name="lastName"
                  label="Họ"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={lastName || ""}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  sx={{ mb: "15px" }}
                />
                <TextField
                  name="middleName"
                  label="Tên đệm"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={middleName || ""}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  sx={{ mb: "15px" }}
                />
                <TextField
                  name="firstName"
                  label="Tên"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={firstName || ""}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  sx={{ mb: "15px" }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={2} style={{ marginTop: "20px", marginBottom: "10px" }}>
              <Grid2 item size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    label="Ngày sinh"
                    value={birthday ? dayjs(birthday) : null}
                    readOnly
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        fullWidth: true,
                        InputProps: { readOnly: true },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 item size={6} sx={{ marginTop: "-13px" }}>
                <FormLabel>Giới tính</FormLabel>
                <RadioGroup row name="sex" value={sex || ""}>
                  <FormControlLabel value="Nam" control={<Radio disabled />} label="Nam" />
                  <FormControlLabel value="Nữ" control={<Radio disabled />} label="Nữ" />
                </RadioGroup>
              </Grid2>
            </Grid2>

            <TextField
              label="Quốc tịch"
              value={nationality || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ margin: "10px 0" }}
            />

            <TextField
              label="Điện thoại di động"
              value={mobilePhone || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mb: "12px" }}
            />

            <TextField
              label="Email"
              value={email || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mb: "12px" }}
            />

            <TextField
              label="Trình độ văn hóa"
              value={educationLevelId?.label || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mb: "12px" }}
            />

            <TextField
              label="Tình trạng hôn nhân"
              value={marriedStatus?.label || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mb: "12px" }}
            />

            <TextField
              label="Dân tộc"
              value={ethnicity?.label || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mb: "12px" }}
            />

            <TextField
              label="Tôn giáo"
              value={religion?.label || religion || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
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
              label="Số CCCD"
              value={identification || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mb: "12px" }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                label="Ngày cấp"
                value={identificationDate ? dayjs(identificationDate) : null}
                readOnly
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    InputProps: { readOnly: true },
                  },
                }}
              />
            </LocalizationProvider>

            <TextField
              label="Nơi cấp"
              value={identificationLocation?.label || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mt: "12px" }}
            />

            <TextField
              label="Tỉnh / TP Nguyên quán"
              value={domicileCityId?.label || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mt: "12px" }}
            />
            <TextField
              label="Xã / Phường Nguyên quán"
              value={domicileWardId?.label || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mt: "12px" }}
            />

            <TextField
              label="Địa chỉ thường trú"
              value={normallyAddress || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mt: "12px" }}
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
              label="Địa chỉ tạm trú"
              value={temporaryAddress || ""}
              fullWidth
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ mt: "12px" }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
