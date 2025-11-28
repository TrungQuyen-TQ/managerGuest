import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardMedia,
  Dialog,
  Grid2,
  IconButton,
  TextField,
} from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { useState } from "react";
import { setDataTableStyle } from "src/utils/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useEffect } from "react";
import CachingEdit from "./caching-edit";
import { useTheme } from "@mui/material/styles";
import BootstrapButton from "src/components/button-custom-filter";

const rows = [
  {
    id: 1,
    stt: 1,
    objectName: "Học viên",
    key: "550e8400-e29b-41d4-a716-446655440000",
    expired: "1",
    status: "Active",
    createdAt: "2025-03-23T08:30:15Z",
  },
  {
    id: 2,
    stt: 2,
    objectName: "Giáo viên",
    key: "6a1b2c3d-4e5f-6789-abcd-ef0123456789",
    expired: "1",
    status: "Unactive",
    createdAt: "2025-03-23T09:45:30Z",
  },
  {
    id: 3,
    stt: 3,
    objectName: "Nhân viên",
    key: "123e4567-e89b-12d3-a456-426614174000",
    expired: "2",
    status: "Active",
    createdAt: "2025-03-22T14:20:50Z",
  },
  {
    id: 4,
    stt: 4,
    objectName: "Học viên",
    key: "987f6543-21ed-43cb-a098-76543210abcd",
    expired: "3",
    status: "Active",
    createdAt: "2025-03-21T07:05:10Z",
  },
  {
    id: 5,
    stt: 5,
    objectName: "Giáo viên",
    key: "abcde123-4567-890f-edcb-a98765432101",
    expired: "4",
    status: "Unactive",
    createdAt: "2025-03-20T12:40:55Z",
  },
  {
    id: 6,
    stt: 6,
    objectName: "Nhân viên",
    key: "c0ffee12-34ab-5678-9cde-f1234567890a",
    expired: "1",
    status: "Active",
    createdAt: "2025-03-19T16:25:30Z",
  },
  {
    id: 7,
    stt: 7,
    objectName: "Học viên",
    key: "deadbeef-0012-3456-789a-bcdef0123456",
    expired: "2",
    status: "Unactive",
    createdAt: "2025-03-18T20:15:45Z",
  },
  {
    id: 8,
    stt: 8,
    objectName: "Giáo viên",
    key: "beadface-9876-5432-10ab-cdef98765432",
    expired: "1",
    status: "Active",
    createdAt: "2025-03-17T23:50:05Z",
  },
  {
    id: 9,
    stt: 9,
    objectName: "Nhân viên",
    key: "facefeed-2468-1357-9bdf-eca86420abcd",
    expired: "3",
    status: "Unactive",
    createdAt: "2025-03-16T04:10:20Z",
  },
  {
    id: 10,
    stt: 10,
    objectName: "Học viên",
    key: "01234567-89ab-cdef-0123-456789abcdef",
    expired: "4",
    status: "Active",
    createdAt: "2025-03-15T11:55:40Z",
  },
];

const fetchStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Active", "Unactive"]);
    }, 500);
  });
};
export default function CachingTable() {
  const [filteredRows, setFilteredRows] = useState(rows);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const theme = useTheme();

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const style = setDataTableStyle(rows);

  useEffect(() => {
    fetchStatus().then((data) => {
      setStatus(data);
    });
  }, []);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const handleFilter = (filterType) => {
    let filteredData = rows;

    // Cập nhật trạng thái activeFilter khi người dùng chọn nút
    setActiveFilter(filterType);

    switch (filterType) {
      case "Tất cả":
        filteredData = rows;
        break;
      case filterType:
        filteredData = rows.filter((row) => row.status === filterType);
        break;
      default:
        filteredData = rows;
        break;
    }

    setFilteredRows(filteredData);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 70, headerAlign: "center", align: "center" },
    {
      field: "objectName",
      headerName: "Tên đối tương",
      width: 200,
    },
    {
      field: "key",
      headerName: "Key",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "expired",
      headerName: "Hết hạn",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Ho_Chi_Minh",
        }).format(date);
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              params.row.status === "Active"
                ? theme.palette.success.main
                : theme.palette.primary.main,
            color: "white",
            width: "75%",
            height: "75%",
            mb: "7px",
          }}
        >
          {params.row.status === "Active" ? "Active" : "Unactive"}
        </Button>
      ),
    },
    {
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 90,
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
          />
        </>
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    requestOfCourse: false,
    noiDung: false,
  });

  return (
    <div style={style}>
      <Grid2 container spacing={1}>
        <Grid2 item size={{ xs: 4, md: 4 }}>
          <TextField
            sx={{ marginTop: "12px" }}
            size="small"
            fullWidth
            label="Nội dung tìm kiếm"
            variant="outlined"
          />
        </Grid2>
        <Grid2 item size={{ xs: 4, md: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <DatePicker
              sx={{ marginTop: "12px", width: "100%" }}
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
              sx={{ marginTop: "12px", width: "100%" }}
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
        <Grid2 item size={{ xs: 12, md: 2 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              margin: "4px",
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
        {status.map((data) => (
          <BootstrapButton
            key={data}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: activeFilter === data ? "neutral.main" : "#285AA9",
            }}
            onClick={() => handleFilter(data)}
          >
            {data}
          </BootstrapButton>
        ))}
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tất cả")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tất cả" ? "neutral.text" : "#285AA9",
          }}
        >
          Tất cả
        </BootstrapButton>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        sx={{
          marginTop: "12px",
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
            paginationModel: { page: 0, pageSize: 30 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[30, 50]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />

      {isDialogEditOpen && (
        <CachingEdit
          open={isDialogEditOpen}
          onClose={() => setisDialogEditOpen(false)}
          rowData={selectedRow}
        />
      )}
    </div>
  );
}
