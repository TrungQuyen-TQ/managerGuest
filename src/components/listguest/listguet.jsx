import { Box, MenuItem, TextField, Grid2, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Grid, Willow } from "@svar-ui/react-grid";
import { useMemo } from "react";
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select } from "@mui/material";

import { padding } from "@mui/system";

// Hàm để căn giữa văn bản trong TextField
const centerInputProps = {
  style: { textAlign: "center" },
};

const createMockData = (count = 10) => {
  const mockData = [];
  const allServices = ["Phát triển Phần mềm Tùy chỉnh", "Bảo trì và Hỗ trợ", "Tích hợp Hệ thống", "Quản lý Dữ liệu"]; // Thêm nhiều dịch vụ hơn

  for (let i = 1; i <= count; i++) {
    // Chọn ngẫu nhiên số lượng dịch vụ (ví dụ: từ 1 đến 3 dịch vụ)
    const numberOfServices = Math.floor(Math.random() * 3) + 1;
    const customerServices = [];

    // Chọn ngẫu nhiên các dịch vụ duy nhất
    const shuffledServices = allServices.sort(() => 0.5 - Math.random());

    // Lấy các dịch vụ đã chọn
    for (let j = 0; j < numberOfServices; j++) {
      if (shuffledServices[j]) {
        customerServices.push(shuffledServices[j]);
      }
    }

    mockData.push({
      id: i,
      name: `Khách hàng ${i}`,
      email: `khachhang${i}@example.com`,
      phone: `09876543${i.toString().padStart(2, '0')}`,
      // ⭐️ TRƯỜNG SERVICE LÀ MẢNG ⭐️
      service: customerServices,
    });
  }

  return mockData;
};


export default function Listguest() {
  const [editValues, setEditValues] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    service: "",
  });
  const [alldata, setAlldata] = React.useState(createMockData);
  const [filteredData, setFilteredData] = React.useState(alldata);



  const handleCreateNew = () => {
    setSelectedRow(null); // Đánh dấu là tạo mới
    setEditValues({
      name: "",
      email: "",
      phone: "",
      service: [],
    });
    setOpen(true);
  };

  const handleDelete = () => {
    if (!selectedRow) return;

    if (window.confirm(`Bạn có chắc chắn muốn xóa bản ghi tại: ${selectedRow.diaChi}?`)) {
      // 1. Loại bỏ khỏi mảng dữ liệu gốc
      const updatedAllData = alldata.filter(item => item.id !== selectedRow.id);

      // 2. Loại bỏ khỏi mảng đang lọc hiển thị
      const updatedFilteredData = filteredData.filter(item => item.id !== selectedRow.id);

      setAlldata(updatedAllData);
      setFilteredData(updatedFilteredData);

      // 3. Đóng Dialog
      setOpen(false);
      console.log("Đã xóa bản ghi ID:", selectedRow.id);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (selectedRow) {
      // Chế độ Edit
      const updatedData = alldata.map((item) =>
        item.id === selectedRow.id ? { ...item, ...editValues } : item
      );
      setAlldata(updatedData);
      console.log("Cập nhật bản ghi:", editValues);
    }
    else {
      // Chế độ Add
      const newRecord = {
        id: allData.length + 1, // Giả sử ID tăng dần
        ...editValues,
      };
      setAllData((prevData) => [...prevData, newRecord]);
      console.log("Thêm bản ghi mới:", newRecord);
    }
    setOpen(false);
  };

  const handleOpenPopup = (row) => {
    setSelectedRow(row);
    setEditValues({ ...row });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const PhieuThuActionCell = ({ row }) => (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
        "--wx-row-height": "45px",
      }}
    >
      <Button
        sx={{
          minWidth: 0, // Quan trọng: Loại bỏ chiều rộng tối thiểu mặc định của MUI
          padding: "2px 6px", // Giảm padding dọc (top/bottom) và ngang (left/right)
          fontSize: "0.7rem", // Giảm kích thước font
          lineHeight: 1.5, // Điều chỉnh chiều cao dòng

          // Nếu muốn giảm thêm, hãy dùng:
          // height: '24px'
        }}
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => handleOpenPopup(row)}

      >
        Xem
      </Button>
    </div>
  );



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  const applyFilters = () => {
    // Logic để áp dụng bộ lọc dựa trên formData
    console.log("Applying filters with data:", formData);
  }
  const resetFilters = () => {
    setFormData({
      name: "",
      service: "",
    });
  }

  const columns = useMemo(
    () => [
      // Các cột Đơn phải có 2 cấp độ
      {
        id: "id",
        header: "ID",
        width: 50,
        resize: true,
        sort: true,
      },
      {
        id: "name",
        header: ["Tên khách hàng"],
        width: 100,
        resize: true,
        sort: true,
      },
      { id: "email", header: ["Email"], width: 200, resize: true, sort: true },

      // Cột gộp 1: Kỳ đến hạn thu tiền (Giữ nguyên)
      {
        id: "phone",
        header: "số điện thoại",
        width: 120,
        resize: true,
        sort: true,
      },
      {
        id: "service",
        header: ["Dịch vụ"],
        width: 300
        ,
        align: "right",
        resize: true,
        sort: true,
      },
      {
        id: "actions",
        header: ["Hành động"], // ⭐️ SỬA ĐỔI ⭐️
        width: 120,
        cell: PhieuThuActionCell,
        resize: true,
      }
    ],
    [
      /* dependencies */
    ]
  );

  return (
    <>

      <Box sx={{ margin: "0 auto" }}>
        <Grid2 container spacing={2} sx={{ mb: 2, alignItems: "center" }}>


          {/* 2. Cột cho Input Field (Trường nhập liệu) - 5/12 */}
          <Grid2 item size={{ xs: 4, md: 6 }} sx={{ fontWeight: 500, color: "#555", display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Tìm kiếm khách hàng"
              variant="outlined"
              size="small"
              name="search"
              value={formData.name}
              onChange={handleInputChange}
              InputProps={centerInputProps} // ÁP DỤNG
            />
            <TextField
              fullWidth
              label="Dịch vụ"
              variant="outlined"
              size="small"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              InputProps={centerInputProps} // ÁP DỤNG
            />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<SearchIcon />}
                onClick={applyFilters}
                sx={{ px: 2, height: "100%  " }}
              >
                Find
              </Button>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={resetFilters} sx={{ px: 2 }} size="small">
                Reset
              </Button>
            </Box>

          </Grid2>


          {/* 3. Cột Khoảng Trắng (Spacer) - 4/12 */}
          <Grid2 xs={8} sm={8} />
          {/* 4. Cột cho Nút Thao Tác - 3/12 */}
          <Grid2 item size={{ xs: 8, md: 8 }} sx={{ textAlign: "right" }}>
            <Willow>
              <Grid
                columns={columns}
                data={alldata}
                columnStyle={(col) =>
                  col.id === 'id' ? 'wx-aEtQH7VY col-id-center' : ''
                }
              />
            </Willow>
            <Grid2 />

          </Grid2>
        </Grid2>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          {/* Tiêu đề thay đổi linh hoạt theo chế độ Add/Edit */}
          <DialogTitle sx={{ color: "white", fontWeight: "bold", backgroundColor: "#0a7444" }}>
            {selectedRow ? `Chỉnh sửa: ${selectedRow.name}` : "Tạo Phiếu Thu Bất Động Sản Mới"}
          </DialogTitle>

          <DialogContent dividers>
            {/* Chúng ta kiểm tra editValues để đảm bảo form luôn có dữ liệu để bind */}
            {editValues && (
              <Grid2 container spacing={2} sx={{ mt: 1, margin: "0 auto", textAlign: "center" }}>

                {/* --- NHÓM 1: THÔNG TIN HỢP ĐỒNG --- */}

                <Grid2 item xs={12}>
                  <TextField
                    label="Tên khách hàng"
                    fullWidth
                    value={editValues.name || ""}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={editValues.email || ""}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <TextField
                    label="Phone"
                    fullWidth
                    type="number"
                    value={editValues.phone || ""}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                  />
                </Grid2>

                {/* --- NHÓM 2: KỲ ĐẾN HẠN (GỒM 2 TRƯỜNG NHƯ GRID) --- */}

                <Grid2 item xs={6}>
                  <TextField
                    label="service"
                    fullWidth
                    value={editValues.service || ""}
                    onChange={(e) => handleFieldChange("service", e.target.value)}
                  />
                </Grid2>

              </Grid2>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
            {/* Cụm nút bên trái: Xóa (Chỉ hiện khi Edit) */}
            <Box>
              {selectedRow && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete} // ⭐️ Kết nối hàm xóa
                  sx={{ fontWeight: 'bold' }}
                >
                  Xóa bản ghi
                </Button>
              )}
            </Box>

            {/* Cụm nút bên phải: Hủy & Lưu */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button onClick={handleClose} color="inherit">Hủy</Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{ px: 4 }}
              >
                {selectedRow ? "Cập nhật" : "Lưu mới"}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}


