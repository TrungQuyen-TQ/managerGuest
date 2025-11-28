import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Stack,
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  IconButton,
  Grid2,
  SvgIcon,
} from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BootstrapButton from "src/components/button-custom-filter";
import { ChartBarIcon, CpuChipIcon } from "@heroicons/react/24/solid";
import CalculateIcon from "@mui/icons-material/Calculate";
import {
  Add,
  Settings,
  CastForEducation,
  LibraryAdd,
  FeaturedVideo,
  Assessment,
  Class,
  FeaturedPlayList,
} from "@mui/icons-material";

const iconMapping = {
  ChartBarIcon: ChartBarIcon,
  CpuChipIcon: CpuChipIcon,
  CalculateIcon: CalculateIcon,
  Add: Add,
  Settings: Settings,
  CastForEducation: CastForEducation,
  LibraryAdd: LibraryAdd,
  FeaturedVideo: FeaturedVideo,
  Assessment: Assessment,
  Class: Class,
  FeaturedPlayList: FeaturedPlayList,
};

const rows = [
  {
    id: 1,
    stt: 1,
    sMenuName: "Tổng quan",
    sMenuIcon: "ChartBarIcon",
    interfaceOrder: 1,
    sMenuLink: "/",
    parentName: "Không thuộc mục nào",
    description: "Trang tổng quan của hệ thống",
  },
  {
    id: 2,
    stt: 2,
    sMenuName: "Quản lý Admin",
    sMenuIcon: "Class",
    interfaceOrder: 2,
    sMenuLink: "",
    parentName: "Không thuộc mục nào",
    description: "Quản lý Admin và các lớp học",
  },
  {
    id: 3,
    stt: 3,
    sMenuName: "Lớp học Admin",
    sMenuIcon: "Add",
    interfaceOrder: 3,
    sMenuLink: "/management-admin/classroom",
    parentName: "Quản lý Admin",
    description: "Danh sách lớp học của Admin",
  },
  {
    id: 4,
    stt: 4,
    sMenuName: "Học viên Admin",
    sMenuIcon: "Add",
    interfaceOrder: 4,
    sMenuLink: "/management-admin/student",
    parentName: "Quản lý Admin",
    description: "Danh sách học viên của Admin",
  },
  {
    id: 5,
    stt: 5,
    sMenuName: "Quản lý",
    sMenuIcon: "Class",
    interfaceOrder: 5,
    sMenuLink: "",
    parentName: "Không thuộc mục nào",
    description: "Quản lý lớp học và học viên",
  },
  {
    id: 6,
    stt: 6,
    sMenuName: "Lớp học của tôi",
    sMenuIcon: "Add",
    interfaceOrder: 6,
    sMenuLink: "/management/my-classroom",
    parentName: "Quản lý",
    description: "Danh sách lớp học của tôi",
  },
  {
    id: 7,
    stt: 7,
    sMenuName: "Học viên",
    sMenuIcon: "Add",
    interfaceOrder: 7,
    sMenuLink: "/management/student",
    parentName: "Quản lý",
    description: "Danh sách học viên",
  },
  {
    id: 8,
    stt: 8,
    sMenuName: "Danh sách đăng ký",
    sMenuIcon: "FeaturedPlayList",
    interfaceOrder: 8,
    sMenuLink: "/registration",
    parentName: "Không thuộc mục nào",
    description: "Danh sách đăng ký khóa học",
  },
  {
    id: 9,
    stt: 9,
    sMenuName: "IELTS",
    sMenuIcon: "CastForEducation",
    interfaceOrder: 9,
    sMenuLink: "",
    parentName: "Không thuộc mục nào",
    description: "Quản lý thi IELTS",
  },
  {
    id: 10,
    stt: 10,
    sMenuName: "Đề thi IELTS",
    sMenuIcon: "Add",
    interfaceOrder: 10,
    sMenuLink: "/ielts/exams",
    parentName: "IELTS",
    description: "Danh sách đề thi IELTS",
  },
  {
    id: 11,
    stt: 11,
    sMenuName: "Thư viện câu hỏi",
    sMenuIcon: "LibraryAdd",
    interfaceOrder: 11,
    sMenuLink: "",
    parentName: "Không thuộc mục nào",
    description: "Kho câu hỏi",
  },
  {
    id: 12,
    stt: 12,
    sMenuName: "Danh sách câu hỏi",
    sMenuIcon: "Add",
    interfaceOrder: 12,
    sMenuLink: "/library",
    parentName: "Thư viện câu hỏi",
    description: "Danh sách câu hỏi đã có",
  },
  {
    id: 13,
    stt: 13,
    sMenuName: "Thống kê",
    sMenuIcon: "Assessment",
    interfaceOrder: 13,
    sMenuLink: "/statistics",
    parentName: "Không thuộc mục nào",
    description: "Thống kê kết quả thi",
  },
  {
    id: 14,
    stt: 14,
    sMenuName: "Cấu hình hệ thống",
    sMenuIcon: "Settings",
    interfaceOrder: 14,
    sMenuLink: "",
    parentName: "Không thuộc mục nào",
    description: "Cấu hình chung của hệ thống",
  },
  {
    id: 15,
    stt: 15,
    sMenuName: "Cấu hình chung",
    sMenuIcon: "Add",
    interfaceOrder: 15,
    sMenuLink: "/setting",
    parentName: "Cấu hình hệ thống",
    description: "Cấu hình chung của hệ thống",
  },
  {
    id: 16,
    stt: 16,
    sMenuName: "Hệ thống",
    sMenuIcon: "CpuChipIcon",
    interfaceOrder: 16,
    sMenuLink: "",
    parentName: "Không thuộc mục nào",
    description: "Quản lý tài khoản và phân quyền",
  },
  {
    id: 17,
    stt: 17,
    sMenuName: "Tài khoản",
    sMenuIcon: "Add",
    interfaceOrder: 17,
    sMenuLink: "/system/account",
    parentName: "Hệ thống",
    description: "Danh sách tài khoản",
  },
  {
    id: 18,
    stt: 18,
    sMenuName: "Quyền hệ thống",
    sMenuIcon: "Add",
    interfaceOrder: 18,
    sMenuLink: "/system/permissions",
    parentName: "Hệ thống",
    description: "Phân quyền hệ thống",
  },
];

export default function MenuTable() {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do
    setIsModalDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleFilter = (filterType) => {
    let filteredData = rows;

    // Cập nhật trạng thái activeFilter khi người dùng chọn nút
    setActiveFilter(filterType);

    if (filterType === "Tất cả") {
      filteredData = rows;
    } else {
      filteredData = rows.filter((row) => row.parentName === filterType);
    }

    setFilteredRows(filteredData);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "sMenuName", headerName: "Tên", width: 150 },
    {
      field: "sMenuIcon",
      headerName: "Biểu tượng",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const IconComponent = iconMapping[params.value]; // Lấy icon từ mapping
        return IconComponent ? (
          <SvgIcon fontSize="small">
            <IconComponent />
          </SvgIcon>
        ) : null;
      },
    },
    {
      field: "interfaceOrder",
      headerName: "Thứ tự giao diện",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    { field: "sMenuLink", headerName: "Liên kết", width: 150 },
    {
      field: "parentName",
      headerName: "Mục cha",
      width: 150,
      renderCell: (params) => <span>{params.value || "Không thuộc mục nào"}</span>,
    },
    { field: "description", headerName: "Ghi chú", width: 200 },
    {
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            // openDialogEdit={openDialogEdit}
            params={params}
            // handleDelete={() => handleDelete(params.row)}
          />
        </>
      ),
    },
  ];

  return (
    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
      <Box style={{ width: "100%" }}>
        <Grid2 container spacing={1}>
          <Grid2 item size={{ xs: 4, md: 4 }}>
            <TextField
              sx={{ margin: "2px", marginTop: "12px" }}
              size="small"
              fullWidth
              label="Nội dung tìm kiếm"
              variant="outlined"
            />
          </Grid2>
          <Grid2 item size={{ xs: 4, md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                sx={{ margin: "2px", marginTop: "12px", width: "100%" }}
                name="fromDate"
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Từ ngày"
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 item size={{ xs: 4, md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                sx={{ margin: "2px", marginTop: "12px", width: "100%" }}
                name="toDate"
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Đến ngày"
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 item size={{ xs: 6, md: 2 }}>
            <Button
              sx={{
                margin: "4px",
                marginTop: "12px",
                backgroundColor: "neutral.main",
                color: "neutral.text",
              }}
              size="small"
              variant="contained"
            >
              Tìm kiếm
            </Button>
          </Grid2>
        </Grid2>
        <Box sx={{ margin: "10px 0 " }}>
          {rows
            .filter((menu) => menu.parentName === "Không thuộc mục nào")
            .map((parentMenu) => (
              <BootstrapButton
                key={parentMenu.id}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: activeFilter === parentMenu.sMenuName ? "neutral.main" : "#285AA9",
                }}
                onClick={() => handleFilter(parentMenu.sMenuName)}
              >
                {parentMenu.sMenuName}
              </BootstrapButton>
            ))}
          <BootstrapButton
            size="small"
            onClick={() => handleFilter("Tất cả")}
            variant="contained"
            sx={{
              backgroundColor: activeFilter === "Tất cả" ? "neutral.main" : "#285AA9",
            }}
          >
            Tất cả
          </BootstrapButton>
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          sx={{
            borderColor: "rgb(224, 224, 224)",
            "& .MuiDataGrid-row": {
              border: "0.1px solid rgb(224, 224, 224) !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f0f0f0",
              borderBottom: "1px solid #ccc ",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50]}
          checkboxSelection
        />
      </Box>
      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />
    </Stack>
  );
}
