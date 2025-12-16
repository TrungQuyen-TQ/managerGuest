import { AddIcCallOutlined } from "@mui/icons-material";
import { Box, MenuItem, TextField, Grid2, Typography, Button } from "@mui/material";
import { flexbox, height, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
const centerInputProps = {
  sx: {
    // Nhắm mục tiêu phần tử input/textarea cơ bản
    "& .MuiInputBase-input": {
      paddingTop: "8px !important",
      paddingBottom: "8px !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    // Áp dụng thêm cho Select (để đảm bảo text căn giữa trong dropdown)
    "& .MuiSelect-select": {
      paddingTop: "8px !important",
      paddingBottom: "8px !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};

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

export default function AddForm() {
  const [rentals, setRentals] = useState([""]);
  const handleAddInput = () => {
    setRentals([...rentals, ""]); // Copy mảng cũ và thêm 1 chuỗi trống
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRentalChange = (index, e) => {
    const newRentals = [...rentals];
    newRentals[index] = e.target.value;
    setRentals(newRentals);
  };
  const [formData, setFormData] = useState({
    name: "",
    Email: "villas",
    phone: "",
    Services: "1",
  });

  const handleSubmit = () => {
    console.log("Dữ liệu Form đã gửi:", formData);
    console.log("Dịch vụ chạy:", rentals);
  };
  return (
    <>
      <Box>
        <FormRow label="Tên khách hàng">
          <TextField
            fullWidth
            size="small"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            InputProps={centerInputProps} // ÁP DỤNG
          />
        </FormRow>

        <FormRow label="Email">
          <TextField
            fullWidth
            size="small"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            InputProps={centerInputProps} // ÁP DỤNG
          />
        </FormRow>

        <FormRow label="Phone">
          <TextField
            fullWidth
            size="small"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleFormChange}
            InputProps={centerInputProps} // ÁP DỤNG
          />
        </FormRow>

        <Grid2 container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
          {/* 1. Cột cho Label (Nhãn) - 3/12 */}
          <Grid2 item size={{ xs: 4, md: 4 }} sx={{ textAlign: { sm: "right" } }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#555", margin: 0 }}>
              <label>Dịch vụ chạy</label>
            </Typography>
          </Grid2>

          {/* 2. Cột cho Input Field (Trường nhập liệu) - 5/12 */}
          <Grid2 item size={{ xs: 4, md: 4 }} sx={{ fontWeight: 500, color: "#555" }}>
            {rentals.map((rentalValue, index) => (
              <Box
                sx={{ display: "flex", gap: "10px", justifyContent: "center", margin: "10px 0" }}
                key={index}
              >
                <TextField
                  fullWidth
                  size="small"
                  name="rental"
                  value={rentalValue}
                  onChange={(e) => handleRentalChange(index, e)}
                  sx={{ height: "100%" }}
                  InputProps={centerInputProps} // ÁP DỤNG
                />
                <Button variant="outlined" size="small" onClick={handleAddInput}>
                  <AddIcon />
                </Button>
              </Box>
            ))}
          </Grid2>

          <Grid2 xs={0} sm={4} />
        </Grid2>

        <Grid2 container spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
          <Grid2 xs={12} sm={3}></Grid2>
          <Grid2 xs={12} sm={7}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
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
    </>
  );
}
