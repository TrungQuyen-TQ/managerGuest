// src/components/house-villa/house-villa-form.jsx

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Grid2, // MUI v5
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

// Cấu hình CSS Căn giữa chuẩn cho Input Field
// Dùng InputProps để áp dụng CSS căn giữa cho văn bản bên trong Input/Select/Date
const centerInputProps = {
  sx: {
    // Nhắm mục tiêu phần tử input/textarea cơ bản
    '& .MuiInputBase-input': { 
        paddingTop: '8px !important', 
        paddingBottom: '8px !important',
        // Dùng flex và align-items cho các input đơn dòng để căn giữa
        display: 'flex',
        alignItems: 'center',
    },
    // Áp dụng thêm cho Select (để đảm bảo text căn giữa trong dropdown)
    '& .MuiSelect-select': {
        paddingTop: '8px !important', 
        paddingBottom: '8px !important',
        display: 'flex',
        alignItems: 'center',
    }
  }
};


// Component FormRow đã được tối ưu hóa
const FormRow = ({ label, children }) => {
  return (
    // Đảm bảo hàng (row) luôn căn giữa các phần tử con theo chiều dọc
    <Grid2 container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
      {/* 1. Cột cho Label (Nhãn) - 3/12 */}
      <Grid2 item size={{ xs: 4, md: 4 }} sx={{ textAlign: { sm: "right" } }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "#555", margin: 0 }}>
          <label>{label}</label>
        </Typography>
      </Grid2>

      {/* 2. Cột cho Input Field (Trường nhập liệu) - 5/12 */}
      <Grid2 item size={{ xs: 4, md: 4 }} sx={{ fontWeight: 500, color: "#555" }}>
        {children}
      </Grid2>
      
      {/* 3. Cột Khoảng Trắng (Spacer) - 4/12 */}
      <Grid2 xs={0} sm={4} /> 
    </Grid2>
  );
};

export const HouseVillaForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    webId: "",
    typeProperty: "villas",
    address: "",
    bedrooms: "1",
    rental: "",
    area: "tayho",
    furnishing: "partially",
    district: "badinh",
    bath: "1",
    houseArea: "",
    landArea: "",
    storey: "1",
    landlordName: "",
    mobile: "",
    landlordName2: "",
    mobile2: "",
    unknownTime: false,
    availableTime: "2025-12-01",
    note: "",
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const isCheckbox = target.type === "checkbox";
    setFormData((prev) => ({ ...prev, [name]: isCheckbox ? target.checked : value }));
  };
  const handleSubmit = () => {
    console.log("Dữ liệu Form đã gửi:", formData);
  };

  return (
    <Paper elevation={1} sx={{ p: 0, overflow: "hidden" }}>
      {/* Header Form */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0" }}>
        <SettingsIcon sx={{ mr: 1, color: "#9e9e9e", fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
          HOUSE & VILLAS - INPUT DATA
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Thông tin Chính" sx={{ textTransform: "none", fontWeight: 600 }} />
          <Tab label="Thông tin bổ sung" sx={{ textTransform: "none", fontWeight: 600 }} />
        </Tabs>
      </Box>

      {/* FORM CONTENT */}
      <Box sx={{ p: 4 }}>
        {/* Tab 0 */}
        {tabValue === 0 && (
          <Box>
            <FormRow label="WebID">
              <TextField
                fullWidth
                size="small"
                name="webId"
                value={formData.webId}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            
            <FormRow label="Type Property" >
              <TextField
                select
                fullWidth
                size="small"
                name="typeProperty"
                value={formData.typeProperty}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="villas">Villas & Houses</MenuItem>
                <MenuItem value="ho">tay ho</MenuItem>

              </TextField>
            </FormRow>
            
            <FormRow label="Address">
              <TextField
                fullWidth
                size="small"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Bed rooms">
              <TextField
                select
                fullWidth
                size="small"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>

              </TextField>
            </FormRow>
            <FormRow label="Rental">
              <TextField
                fullWidth
                size="small"
                name="rental"
                value={formData.rental}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Area">
              <TextField
                select
                fullWidth
                size="small"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                // Loại bỏ sx không chuẩn cũ, thay bằng InputProps
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="tayho">Villas in Tay Ho</MenuItem>
                <MenuItem value="hanoi">Villas in hanoi</MenuItem>
              </TextField>
            </FormRow>
            <FormRow label="Furnishing">
              <TextField
                select
                fullWidth
                size="small"
                name="furnishing"
                value={formData.furnishing}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="partially">Partially</MenuItem>
              </TextField>
            </FormRow>
            <FormRow label="District">
              <TextField
                select
                fullWidth
                size="small"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="badinh">Ba Dinh</MenuItem>
              </TextField>
            </FormRow>
            <FormRow label="Bath">
              <TextField
                select
                fullWidth
                size="small"
                name="bath"
                value={formData.bath}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </TextField>
            </FormRow>
            <FormRow label="House Area">
              <TextField
                fullWidth
                size="small"
                name="houseArea"
                value={formData.houseArea}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Land Area">
              <TextField
                fullWidth
                size="small"
                name="landArea"
                value={formData.landArea}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Storey">
              <TextField
                select
                fullWidth
                size="small"
                name="storey"
                value={formData.storey}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>

              </TextField>
            </FormRow>
          </Box>
        )}

        {/* Tab 1 */}
        {tabValue === 1 && (
          <Box sx={{justifyContent: "center"}}>
            <FormRow label="Landlord Name">
              <TextField
                fullWidth
                size="small"
                name="landlordName"
                value={formData.landlordName}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Mobile">
              <TextField
                fullWidth
                size="small"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Landlord Name 2">
              <TextField
                fullWidth
                size="small"
                name="landlordName2"
                value={formData.landlordName2}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            <FormRow label="Mobile 2">
              <TextField
                fullWidth
                size="small"
                name="mobile2"
                value={formData.mobile2}
                onChange={handleInputChange}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            
            {/* FormControlLabel (Checkbox) thường không cần InputProps */}
            <FormRow label="Unknown Time">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="unknownTime"
                    checked={formData.unknownTime}
                    onChange={handleInputChange}
                  />
                }
                label=""
              />
            </FormRow>
            
            <FormRow label="Available Time">
              {/* TextField type="date" cần InputProps để căn giữa */}
              <TextField
                type="date"
                fullWidth
                size="small"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={centerInputProps} // ÁP DỤNG
              />
            </FormRow>
            
            {/* TextField multiline không cần căn giữa padding, nên loại bỏ InputProps */}
            <FormRow label="Note">
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Note"
                size="small"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                // KHÔNG ÁP DỤNG InputProps vì đây là textarea (multiline)
              />
            </FormRow>
          </Box>
        )}

        {/* ACTIONS - Nút LƯU/HỦY */}
        <Grid2 container spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
          <Grid2 xs={12} sm={3}></Grid2>
          <Grid2 xs={12} sm={7}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#26c6da",
                  "&:hover": { bgcolor: "#00acc1" },
                  fontWeight: "bold",
                  boxShadow: "none",
                }}
              >
                LƯU
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#e0e0e0",
                  color: "#333",
                  "&:hover": { bgcolor: "#d5d5d5" },
                  fontWeight: "bold",
                  boxShadow: "none",
                }}
              >
                HỦY
              </Button>
            </Stack>
          </Grid2>
          <Grid2 xs={0} sm={2} />
        </Grid2>
      </Box>
    </Paper>
  );
};