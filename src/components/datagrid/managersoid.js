import React, { useState, useEffect, useMemo } from "react";
// 1. Import Svar Components
import AddIcon from '@mui/icons-material/Add';
import { Grid, Willow } from "@svar-ui/react-grid";
import SelectionCheckboxCell from "../custom/SelectionCheckboxCell.jsx";
import SelectionCheckboxBind from "../custom/SelectionCheckboxBind.jsx"; // Import ô checkbox tùy chỉnh
import { Pager } from "@svar-ui/react-core"; // Import Pager để phân trang
import "@svar-ui/react-grid/all.css";
import "@svar-ui/react-core/all.css";
import { faker } from "@faker-js/faker/locale/vi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

// Danh sách các ngân hàng để tạo dữ liệu Tài khoản ngẫu nhiên
const BANK_NAMES = [
  "Vietcombank",
  "Techcombank",
  "VPBank",
  "ACB",
  "Sacombank",
  "VietinBank",
  "MBBank",
  "TPBank",
];
// 2. Import MUI Components & Icons
import {
  Box,
  Card,
  Grid as MuiGrid,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  PhoneInTalk as PhoneIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import StatusCell from "../custom/StatusCell.jsx";
// --- 1. Component Ô Hành Động (Phiếu Thu: + Tạo / Xem) ---

// --- 2. Component Ô Khách Hàng (Tạo hiệu ứng nền vàng) ---
const KhachHangCell = ({ row }) => (
  <Typography
    sx={{
      backgroundColor: "#fffbe6", // Màu vàng nhạt giống trong ảnh
      padding: "2px 4px",
      borderRadius: "4px",
      textAlign: "center",
      fontSize: "0.85rem",
    }}
    variant="body2"
  >
    {row.khachHang}
  </Typography>
);

// --- DỮ LIỆU GIẢ LẬP ---
const generateMockData = (count = 100) => {
  const data = [];

  for (let i = 1; i <= count; i++) {
    // 1. Tạo ngày tháng cơ sở
    const startDate = faker.date.recent({ days: 180 });
    const endDate = faker.date.soon({ days: 365, refDate: startDate });

    // 2. Tạo logic ngày tháng cho nhóm Kỳ Hạn (Nhà & Utility)
    const houseDueDate = faker.date.soon({ days: 30, refDate: startDate });
    const utilityDueDate = faker.date.soon({ days: 45, refDate: startDate });

    // 3. Tạo logic tiền tệ cho nhóm Phiếu Thu (Nhà & Utility)
    const houseReceiptAmount = faker.number.int({ min: 1000000, max: 10000000, step: 500000 });
    const utilityReceiptAmount = faker.number.int({ min: 50000, max: 2000000, step: 50000 });

    data.push({
      id: i,
      // Địa chỉ nhà
      diaChi: `Nhà ${i} - ${faker.location.streetAddress()}`,

      // Thời hạn hợp đồng (dạng chuỗi ngày tháng)
      thoiHanHD: `${startDate.toLocaleDateString("vi-VN")} - ${endDate.toLocaleDateString("vi-VN")}`,

      // NHÓM 1: Kỳ đến hạn thu tiền
      kyDenHanNha: houseDueDate.toLocaleDateString("vi-VN"), // Ngày thu tiền nhà
      kyDenHanUtility: utilityDueDate.toLocaleDateString("vi-VN"), // Ngày thu tiền điện/nước

      // NHÓM 2: Phiếu thu (Đã gán ID cho ActionCell và số tiền cho Utility)
      phieuThuNha: houseReceiptAmount,
      phieuThuUtility: utilityReceiptAmount, // Số tiền điện nước thực tế

      trangThai: faker.helpers.arrayElement(["Paid", "Submit", "Draft"]),
      ky: faker.helpers.arrayElement(["Hàng tháng", "Quý", "Năm"]),
      giaThue: faker.number.int({ min: 1000, max: 5000, step: 100 }),
      khachHang: `${faker.person.lastName()} ${faker.person.firstName()}`,

      // Tài khoản ngân hàng chi tiết
      taiKhoan: `${faker.helpers.arrayElement(BANK_NAMES)}: ${faker.finance.accountNumber(10)}`,
    });
  }

  return data;
};

const initialData = generateMockData();

// --- COMPONENT THẺ THỐNG KÊ ---
const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
    <Typography
      variant="caption"
      color="textSecondary"
      sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 1 }}
    >
      {title}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          bgcolor: color || "#1a237e",
          color: "white",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          {value}
        </Typography>
      </Box>

    </Box>
  </Card>
);

// --- COMPONENT CHÍNH ---
const PropertyDashboard = () => {
  const [editValues, setEditValues] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleFieldChange = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateNew = () => {
    setSelectedRow(null); // Đánh dấu là tạo mới
    setEditValues({
      diaChi: "",
      khachHang: "",
      giaThue: 0,
      trangThai: "Draft",
      taiKhoan: "",
      thoiHanHD: "",
      kyDenHanNha: "",
      kyDenHanUtility: 0,
      phieuThuNha: 0,
      phieuThuUtility: 0,
      ky: "Hàng tháng"
    });
    setOpen(true);
  };

  const handleDelete = () => {
    if (!selectedRow) return;

    if (window.confirm(`Bạn có chắc chắn muốn xóa bản ghi tại: ${selectedRow.diaChi}?`)) {
      // 1. Loại bỏ khỏi mảng dữ liệu gốc
      const updatedAllData = allData.filter(item => item.id !== selectedRow.id);

      // 2. Loại bỏ khỏi mảng đang lọc hiển thị
      const updatedFilteredData = filteredData.filter(item => item.id !== selectedRow.id);

      setAllData(updatedAllData);
      setFilteredData(updatedFilteredData);

      // 3. Đóng Dialog
      setOpen(false);
      console.log("Đã xóa bản ghi ID:", selectedRow.id);
    }
  };


  const handleSave = () => {
    let updatedAllData;

    if (!selectedRow) {
      // --- LOGIC TẠO MỚI ---
      const newRecord = {
        ...editValues,
        id: allData.length > 0 ? Math.max(...allData.map(o => o.id)) + 1 : 1
      };
      updatedAllData = [newRecord, ...allData];
    } else {
      // --- LOGIC SỬA (CŨ) ---
      updatedAllData = allData.map((item) => {
        if (item.id === selectedRow.id) {
          return { ...item, ...editValues };
        }
        return item;
      });
    }

    setAllData(updatedAllData);

    // Cập nhật lại filteredData để Grid hiển thị ngay lập tức
    if (!selectedRow) {
      setFilteredData([{ ...editValues, id: updatedAllData[0].id }, ...filteredData]);
    } else {
      setFilteredData(filteredData.map(item =>
        item.id === selectedRow.id ? { ...item, ...editValues } : item
      ));
    }

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
        color="info"
        onClick={() => handleOpenPopup(row)}

      >
        Xem
      </Button>
    </div>
  );

  // Hàm mở Popup và gán dữ liệu hàng
  const handleOpenPopup = (row) => {
    setSelectedRow(row);
    setEditValues({ ...row });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // 1. STATE QUẢN LÝ DỮ LIỆU
  const [allData, setAllData] = useState(initialData); // Dữ liệu gốc
  const [filteredData, setFilteredData] = useState(initialData); // Dữ liệu sau khi lọc
  const [pageData, setPageData] = useState([]); // Dữ liệu hiển thị trên trang hiện tại

  // 2. STATE CHO BỘ LỌC
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    keyword: "",
  });


  const PAGE_SIZE = 30;

  // 4. HÀM XỬ LÝ LỌC (FILTER LOGIC)
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    console.log("Filter changed:", field, value);
  };

  const applyFilters = () => {
    let result = [...allData];

    // Lọc theo Location
    if (filters.location) {
      console.log("Filtering by location:", filters);
      console.log("Before filter, data count:", result);
      result = result.filter((item) => {
        const itemLocation = item.diaChi.toLowerCase();
        const filterLocation = filters.location.toLowerCase();
        return itemLocation.includes(filterLocation);
      });
      console.log("After filter, data count:", result);
    }
    // Lọc theo Property Type
    if (filters.propertyType) {
      result = result.filter((item) => item.propertyType === filters.propertyType);
    }
    // Lọc theo Giá (Rental)
    if (filters.minPrice) {
      result = result.filter((item) => item.rental >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((item) => item.rental <= Number(filters.maxPrice));
    }
    // Lọc theo Keyword (Tìm trong Address hoặc Agent)
    if (filters.keyword) {
      const lowerKeyword = filters.keyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.address.toLowerCase().includes(lowerKeyword) ||
          item.agent.toLowerCase().includes(lowerKeyword)
      );
    }

    setFilteredData(result);
    // Quan trọng: Reset về trang đầu tiên khi lọc xong
    // (Logic này được xử lý tự động bởi Pager khi total thay đổi, hoặc ta set thủ công index)
  };

  // Reset bộ lọc
  const resetFilters = () => {
    setFilters({ location: "", propertyType: "", minPrice: "", maxPrice: "", keyword: "" });
    setFilteredData(allData);
  };

  // 5. HÀM XỬ LÝ PHÂN TRANG (PAGING LOGIC)
  // Hàm này được gọi bởi component <Pager /> của Svar
  const handlePageChange = (ev) => {
    const { from, to } = ev;
    // Cắt dữ liệu từ mảng đã lọc
    const currentPageRows = filteredData.slice(from, to);
    setPageData(currentPageRows);
  };

  // Khởi tạo dữ liệu trang đầu tiên khi filteredData thay đổi
  useEffect(() => {
    setPageData(filteredData.slice(0, PAGE_SIZE));
  }, [filteredData]);



  // 7. CẤU HÌNH CỘT (COLUMNS)
  const columns = useMemo(
    () => [
      // Các cột Đơn phải có 2 cấp độ
      {
        id: "diaChi",
        header: ["Địa chỉ nhà"],
        width: 100,
        cell: ({ row }) => <span style={{ fontWeight: "bold" }}>{row.diaChi}</span>,
        resize: true,
        sort: true,
      },
      { id: "thoiHanHD", header: ["Thời hạn hợp đồng"], width: 120, resize: true, sort: true },

      // Cột gộp 1: Kỳ đến hạn thu tiền (Giữ nguyên)
      {
        id: "kyDenHanNha",
        header: [{ text: "Kỳ đến hạn thu tiền", colspan: 2 }, "Nhà"],
        width: 120,
        resize: true,
        sort: true,
      },
      {
        id: "kyDenHanUtility",
        header: ["", "Utility"],
        width: 80,
        align: "right",
        resize: true,
        sort: true,
      },

      // Cột gộp 2: Phiếu thu (Giữ nguyên)
      {
        id: "phieuThuNha",
        header: [{ text: "Phiếu thu", colspan: 2 }, "Nhà"],
        width: 150,

        sort: false,
        resize: true,
        sort: true,
      },
      {
        id: "phieuThuUtility",
        header: ["", "Utility"],
        width: 90,
        align: "right",
        resize: true,
        sort: true,
      },

      // Các cột Đơn phải được sửa thành mảng 2 phần tử
      {
        id: "trangThai",
        header: ["Trạng thái"], // ⭐️ SỬA ĐỔI ⭐️
        width: 100,
        cell: StatusCell,
        align: "center",
        sort: true,
      },
      {
        id: "ky",
        header: ["Kỳ"], // ⭐️ SỬA ĐỔI ⭐️
        width: 90,
        resize: true,
        sort: true,
      },
      {
        id: "giaThue",
        header: ["Giá thuê"], // ⭐️ SỬA ĐỔI ⭐️
        width: 100,
        align: "right",
        resize: true,
        sort: true,
      },
      {
        id: "khachHang",
        header: ["Khách hàng"], // ⭐️ SỬA ĐỔI ⭐️
        width: 130,
        cell: KhachHangCell,
        resize: true,
        sort: true,
      },
      {
        id: "taiKhoan",
        header: ["Tài khoản"], // ⭐️ SỬA ĐỔI ⭐️
        width: 100,
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
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
      {/* SECTION 1: STATS */}
      <MuiGrid container spacing={2} mb={3}>
        <MuiGrid item xs={12} sm={6} md={3}>
          <StatCard title="House & Villas" value="4510" icon={<HomeIcon fontSize="large" />} />
        </MuiGrid>
        <MuiGrid item xs={12} sm={6} md={3}>
          <StatCard
            title="Service Apartment"
            value="2860"
            icon={<ApartmentIcon fontSize="large" />}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={6} md={3}>
          <StatCard title="Apartment" value="9337" icon={<HomeIcon fontSize="large" />} />
        </MuiGrid>
        <MuiGrid item xs={12} sm={6} md={3}>
          <StatCard title="Tools" value="1" icon={<SettingsIcon fontSize="large" />} />
        </MuiGrid>
      </MuiGrid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 1. Location */}

          <Paper sx={{ p: 2, mb: 3 }}>
            {/* BẮT ĐẦU: Thay thế Box bằng MuiGrid container */}
            <MuiGrid container spacing={2} alignItems="flex-end">
              {/* HÀNG 1: Select Boxes */}

              {/* 1. Location */}
              <MuiGrid item xs={6} sm={4} md={3}>
                <TextField
                  size="small"
                  label="Location"
                  fullWidth
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </MuiGrid>

              {/* 2. Property Type */}
              <MuiGrid item xs={6} sm={4} md={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={filters.propertyType}
                    label="Type"
                    onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Villas">Villas</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Apartment">Apartment</MenuItem>
                  </Select>
                </FormControl>
              </MuiGrid>

              {/* 3. Bath */}
              <MuiGrid item xs={4} sm={3} md={1.5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Bath</InputLabel>
                  <Select
                    value={filters.bath}
                    label="Bath"
                    onChange={(e) => handleFilterChange("bath", e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="3">5</MenuItem>
                    <MenuItem value="3">6</MenuItem>
                    <MenuItem value="3">7</MenuItem>
                    <MenuItem value="3">8</MenuItem>
                    <MenuItem value="3">9</MenuItem>
                    <MenuItem value="3">10</MenuItem>
                  </Select>
                </FormControl>
              </MuiGrid>

              {/* 4. Bed */}
              <MuiGrid item xs={4} sm={3} md={1.5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Bed</InputLabel>
                  <Select
                    value={filters.bed}
                    label="Bed"
                    onChange={(e) => handleFilterChange("bed", e.target.value)}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
              </MuiGrid>
              <MuiGrid item xs={4} sm={3} md={2}></MuiGrid>
              {/* HÀNG 2: TextFields và Buttons */}

              {/* 5. Min Price */}
              <MuiGrid item xs={4} sm={3} md={1.5}>
                <TextField
                  size="small"
                  label="Min Price"
                  type="number"
                  fullWidth
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                />
              </MuiGrid>

              {/* 6. Max Price */}
              <MuiGrid item xs={4} sm={3} md={1.5}>
                <TextField
                  size="small"
                  label="Max Price"
                  type="number"
                  fullWidth
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                />
              </MuiGrid>

              {/* 7. Min Sqm */}
              <MuiGrid item xs={4} sm={3} md={1.5}>
                <TextField
                  size="small"
                  label="Min Sqm"
                  type="number"
                  fullWidth
                  value={filters.minSqm}
                  onChange={(e) => handleFilterChange("minSqm", e.target.value)}
                />
              </MuiGrid>

              {/* 8. RE_Id */}
              <MuiGrid item xs={4} sm={3} md={1.5}>
                <TextField
                  size="small"
                  label="RE_Id"
                  fullWidth
                  value={filters.reId}
                  onChange={(e) => handleFilterChange("reId", e.target.value)}
                />
              </MuiGrid>

              {/* 9. Keyword */}
              <MuiGrid item xs={8} sm={6} md={2.5}>
                <TextField
                  size="small"
                  label="Keyword (Addr/Agent)"
                  fullWidth
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange("keyword", e.target.value)}
                />
              </MuiGrid>

              {/* Buttons (Giữ riêng, căn chỉnh cuối cùng) */}
              <MuiGrid item xs={12} sm={6} md={2}>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-start" }}>
                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{ bgcolor: "#1a237e", px: 3 }}
                    onClick={applyFilters}
                  >
                    Find
                  </Button>
                  <Button variant="outlined" startIcon={<RefreshIcon />} onClick={resetFilters}>
                    Reset
                  </Button>
                </Box>
              </MuiGrid>
            </MuiGrid>
            {/* KẾT THÚC: Thay thế Box bằng MuiGrid container */}
          </Paper>
        </Box>
      </Paper>

      {/* SECTION 3: GRID & PAGING */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Hiển thị: {pageData.length} / {filteredData.length} bản ghi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />} // Hoặc AddIcon nếu bạn import
          sx={{ px: 3 }}
          onClick={handleCreateNew}
        >
          Tạo Phiếu Mới
        </Button>
      </Box>

      {/* CONTAINER GRID */}
      <div
        style={{
          height: "550px",
          width: "100%",
          border: "1px solid #e0e0e0",
          marginBottom: "15px",
          overflow: "auto",
        }}
      >
        <Willow>
          <Grid
            columns={columns}
            data={pageData} // Chỉ truyền data của trang hiện tại vào Grid
            select={true}
          />
        </Willow>
      </div>

      {/* COMPONENT PHÂN TRANG (PAGER) */}
      {/* total: Tổng số bản ghi (sau khi lọc) */}
      {/* pageSize: 30 (như yêu cầu) */}
      <Box sx={{ display: "flex", justifyContent: "center" }} >
        <Pager total={initialData.length} pageSize={PAGE_SIZE} onChange={handlePageChange} />
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {/* Tiêu đề thay đổi linh hoạt theo chế độ Add/Edit */}
        <DialogTitle sx={{ bgcolor: "#1a237e", color: "white", fontWeight: "bold" }}>
          {selectedRow ? `Chỉnh sửa: ${selectedRow.diaChi}` : "Tạo Phiếu Thu Bất Động Sản Mới"}
        </DialogTitle>

        <DialogContent dividers>
          {/* Chúng ta kiểm tra editValues để đảm bảo form luôn có dữ liệu để bind */}
          {editValues && (
            <MuiGrid container spacing={2} sx={{ mt: 1 }}>

              {/* --- NHÓM 1: THÔNG TIN HỢP ĐỒNG --- */}
              <MuiGrid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: "#1a237e", fontWeight: 'bold' }}>Thông tin hợp đồng</Typography>
              </MuiGrid>
              <MuiGrid item xs={12}>
                <TextField
                  label="Địa chỉ nhà"
                  fullWidth
                  value={editValues.diaChi || ""}
                  onChange={(e) => handleFieldChange("diaChi", e.target.value)}
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Thời hạn hợp đồng"
                  fullWidth
                  value={editValues.thoiHanHD || ""}
                  onChange={(e) => handleFieldChange("thoiHanHD", e.target.value)}
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Giá thuê hợp đồng ($)"
                  fullWidth
                  type="number"
                  value={editValues.giaThue || ""}
                  onChange={(e) => handleFieldChange("giaThue", e.target.value)}
                />
              </MuiGrid>

              {/* --- NHÓM 2: KỲ ĐẾN HẠN (GỒM 2 TRƯỜNG NHƯ GRID) --- */}
              <MuiGrid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: "#1a237e", fontWeight: 'bold', mt: 1 }}>Kỳ đến hạn thu tiền</Typography>
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Kỳ hạn Nhà"
                  fullWidth
                  value={editValues.kyDenHanNha || ""}
                  onChange={(e) => handleFieldChange("kyDenHanNha", e.target.value)}
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Kỳ hạn Utility"
                  fullWidth
                  type="number"
                  value={editValues.kyDenHanUtility || ""}
                  onChange={(e) => handleFieldChange("kyDenHanUtility", e.target.value)}
                />
              </MuiGrid>

              {/* --- NHÓM 3: THÔNG TIN PHIẾU THU (GỒM 2 TRƯỜNG NHƯ GRID) --- */}
              <MuiGrid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: "#1a237e", fontWeight: 'bold', mt: 1 }}>Thông tin thực thu</Typography>
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Thực thu Nhà"
                  fullWidth
                  type="number"
                  value={editValues.phieuThuNha || ""}
                  onChange={(e) => handleFieldChange("phieuThuNha", e.target.value)}
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Thực thu Utility"
                  fullWidth
                  type="number"
                  value={editValues.phieuThuUtility || ""}
                  onChange={(e) => handleFieldChange("phieuThuUtility", e.target.value)}
                />
              </MuiGrid>

              {/* --- NHÓM 4: KHÁCH HÀNG & TRẠNG THÁI --- */}
              <MuiGrid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: "#1a237e", fontWeight: 'bold', mt: 1 }}>Khách hàng & Thanh toán</Typography>
              </MuiGrid>
              <MuiGrid item xs={6}>
                <TextField
                  label="Tên khách hàng"
                  fullWidth
                  value={editValues.khachHang || ""}
                  onChange={(e) => handleFieldChange("khachHang", e.target.value)}
                />
              </MuiGrid>
              <MuiGrid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    value={editValues.trangThai || "Draft"}
                    label="Trạng thái"
                    onChange={(e) => handleFieldChange("trangThai", e.target.value)}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Submit">Submit</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                  </Select>
                </FormControl>
              </MuiGrid>
              <MuiGrid item xs={12}>
                <TextField
                  label="Tài khoản nhận tiền"
                  fullWidth
                  value={editValues.taiKhoan || ""}
                  onChange={(e) => handleFieldChange("taiKhoan", e.target.value)}
                  helperText="Ví dụ: Vietcombank - 123456xxx"
                />
              </MuiGrid>
            </MuiGrid>
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
              sx={{ bgcolor: "#1a237e", px: 4 }}
            >
              {selectedRow ? "Cập nhật" : "Lưu mới"}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertyDashboard;
