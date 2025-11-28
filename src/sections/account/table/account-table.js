import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  Stack,
  styled,
  SvgIcon,
  TextField,
  Tooltip,
} from "@mui/material";
import { PlaylistAdd, Search } from "@mui/icons-material";
import ActionColumn from "src/components/action-column ";
import LoginIcon from "@mui/icons-material/Login";
import ModalDetail from "src/components/modal-detail";
import AccountDetail from "../detail/account-detail";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { useEffect } from "react";
import { useState } from "react";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listDepartmentApi } from "src/contexts/api/company/api-department";
import SnackbarAlert from "src/components/action-notification";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { setStyleTable } from "src/utils/style-table";
import AccountEditDialog from "../edit/account-edit-dialog";
import { useDispatch } from "react-redux";
import { resetAccountAsync } from "src/slices/account/account";
import SystemAccessDialog from "./system-access-dialog";
import BootstrapButton from "src/components/button-custom-filter";
import { useModuleData } from "src/hooks/use-module-data";

const rows = [
  {
    id: 1,
    stt: 1,
    avatar: "/images/avatar1.jpg",
    accountCode: "EMP001",
    firstName: "Nguyễn",
    middleName: "Văn",
    lastName: "An",
    accountGroup: ["Nhân viên"],
    username: "nva",
    email: "nva@example.com",
    mobilePhone: "0909123456",
  },
  {
    id: 2,
    stt: 2,
    avatar: "/images/avatar2.jpg",
    accountCode: "EMP002",
    firstName: "Trần",
    middleName: "Thị",
    lastName: "Bích",
    accountGroup: ["Nhân viên"],
    username: "ttb",
    email: "ttb@example.com",
    mobilePhone: "0909345678",
  },
  {
    id: 3,
    stt: 3,
    avatar: "/images/avatar3.jpg",
    accountCode: "EMP003",
    firstName: "Lê",
    middleName: "Minh",
    lastName: "Tuấn",
    accountGroup: ["Hệ thống"],
    username: "lvc",
    email: "lvc@example.com",
    mobilePhone: "0909456789",
  },
  {
    id: 4,
    stt: 4,
    avatar: "/images/avatar4.jpg",
    accountCode: "EMP004",
    firstName: "Phạm",
    middleName: "Hoàng",
    lastName: "Nam",
    accountGroup: ["Nhân viên"],
    username: "ptd",
    email: "ptd@example.com",
    mobilePhone: "0909567890",
  },
  {
    id: 5,
    stt: 5,
    avatar: "/images/avatar5.jpg",
    accountCode: "EMP005",
    firstName: "Bùi",
    middleName: "Văn",
    lastName: "Long",
    accountGroup: ["Hệ thống"],
    username: "hve",
    email: "hve@example.com",
    mobilePhone: "0909678901",
  },
  {
    id: 6,
    stt: 6,
    avatar: "/images/avatar6.jpg",
    accountCode: "EMP006",
    firstName: "Hoàng",
    middleName: "Thị",
    lastName: "Linh",
    accountGroup: ["Hệ thống"],
    username: "ntf",
    email: "ntf@example.com",
    mobilePhone: "0909789012",
  },
  {
    id: 7,
    stt: 7,
    avatar: "/images/avatar7.jpg",
    accountCode: "EMP007",
    firstName: "Võ",
    middleName: "Quang",
    lastName: "Dũng",
    accountGroup: ["Nhân viên"],
    username: "vvg",
    email: "vvg@example.com",
    mobilePhone: "0909890123",
  },
  {
    id: 8,
    stt: 8,
    avatar: "/images/avatar8.jpg",
    accountCode: "EMP008",
    firstName: "Ngô",
    middleName: "Thanh",
    lastName: "Hương",
    accountGroup: ["Nhân viên"],
    username: "tth",
    email: "tth@example.com",
    mobilePhone: "0909901234",
  },
  {
    id: 9,
    stt: 9,
    avatar: "/images/avatar9.jpg",
    accountCode: "EMP009",
    firstName: "Tạ",
    middleName: "Anh",
    lastName: "Khoa",
    accountGroup: ["Hệ thống"],
    username: "dvi",
    email: "dvi@example.com",
    mobilePhone: "0909012345",
  },
  {
    id: 10,
    stt: 10,
    avatar: "/images/avatar10.jpg",
    accountCode: "EMP010",
    firstName: "Khiêm",
    middleName: "Thị",
    lastName: "Bùi",
    accountGroup: ["Quản lý"],
    username: "btk",
    email: "btk@example.com",
    mobilePhone: "0909123456",
  },
];

export default function AccountTable() {
  const { data, tr } = useModuleData("system/account");

  const dispatch = useDispatch();
  const [filteredRows, setFilteredRows] = useState(
    rows.filter((row) => row.accountGroup.includes("Nhân viên"))
  );
  const [activeFilter, setActiveFilter] = useState("Nhân viên");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [isDialogDetailOpen, setisDialogDetailOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogSystemAccessOpen, setDialogSystemAccessOpen] = useState(false);
  const style = setStyleTable(filteredRows);
  const [isClassQuantityDialogOpen, setIsClassQuantityDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState(dayjs().subtract(7, "day"));
  const [toDate, setToDate] = useState(dayjs());
  const [countAccount, setCountAccount] = useState(0);

  //Pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    email: false,
    sdt: true,
    ghiChu: false,
  });

  const listData = async () => {
    // const res = await listAccountPaginationApi(paginationModel.page + 1, paginationModel.pageSize);
    const res = await listEmployeeApi();
  };

  useEffect(() => {
    listData();
  }, [paginationModel]);

  if (!data) return null;
  const list = data.pages.list;

  const handleDialogSystemAccessOpen = (params) => {
    setSelectedRow(params.row);
    setDialogSystemAccessOpen(true);
  };

  const handleDialogSystemAccessClose = () => {
    setDialogSystemAccessOpen(false);
  };

  const handleCloseClassQuantityDialog = () => {
    setIsClassQuantityDialogOpen(false);
  };

  const openDialogDetail = (params) => {
    setSelectedRow(params.row);
    setisDialogDetailOpen(true);
  };

  const closeDialogDetail = () => {
    setisDialogDetailOpen(false);
  };

  const closeDialogEdit = (isEvent) => {
    if (isEvent) {
      setisDialogEditOpen(false);
      setSnackbarSeverity("success");
      setSnackbarMessage("Sửa thành công !");
      setSnackbarOpen(true);
    } else {
      setisDialogEditOpen(false);
    }
  };

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
    dispatch(resetAccountAsync());
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    {
      field: "stt",
      headerName: tr(list.table.columns.stt.headerName.key),
      width: 10,
    },
    {
      field: "avatar",
      headerName: tr(list.table.columns.avatar.headerName.key),
      width: 60,
      renderCell: (params) => (
        <Avatar
          src={"https://lotus.i.tisbase.online" + params.row.avatar}
          alt="Avatar"
          sx={{ width: 40, height: 40 }}
        >
          Avatar
        </Avatar>
      ),
    },
    {
      field: "accountCode",
      headerName: tr(list.table.columns.accountCode.headerName.key),
      width: 120,
    },
    {
      field: "fullname",
      headerName: tr(list.table.columns.fullname.headerName.key),
      width: 150,
      renderCell: (params) =>
        `${params.row.lastName} ${params.row.middleName} ${params.row.firstName}`,
    },
    {
      field: "username",
      headerName: tr(list.table.columns.username.headerName.key),
      width: 150,
    },
    {
      field: "accountGroup",
      headerName: tr(list.table.columns.accountGroup.headerName.key),
      width: 190,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ display: "flex", mt: "15px" }}>
          {params.value.map((group, index) => (
            <Chip
              key={index}
              label={group}
              size="small"
              color={group === "Quản lý" ? "success" : group === "Hệ thống" ? "info" : "default"}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: "email",
      headerName: tr(list.table.columns.email.headerName.key),
      width: 180,
    },
    {
      field: "mobilePhone",
      headerName: tr(list.table.columns.mobilePhone.headerName.key),
      width: 120,
    },
    { flex: 1 },
    {
      field: "action",
      headerName: tr(list.table.columns.action.headerName.key),
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "3px" }}>
          <Tooltip title={tr(list.table.columns.action.tooltip.systemAccess.key)}>
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleDialogSystemAccessOpen(params);
              }}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
          <ActionColumn
            handleViewDetail={openDialogDetail}
            openDialogEdit={openDialogEdit}
            params={params}
          />
        </Box>
      ),
    },
  ];

  const handleSearch = () => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    const filteredData = rows.filter((row) => {
      const lastName = row.lastName.toLowerCase();
      const middleName = row.middleName.toLowerCase();
      const firstName = row.firstName.toLowerCase();
      const mobilePhone = row.mobilePhone.toLowerCase();
      const email = row.email.toLowerCase();
      const registrationDate = row.registrationDate ? dayjs(row.registrationDate) : null;

      const matchesText =
        lastName.includes(normalizedSearchText) ||
        middleName.includes(normalizedSearchText) ||
        firstName.includes(normalizedSearchText) ||
        mobilePhone.includes(normalizedSearchText) ||
        email.includes(normalizedSearchText);

      const matchesDate =
        registrationDate &&
        registrationDate.isAfter(dayjs(fromDate).startOf("day")) &&
        registrationDate.isBefore(dayjs(toDate).endOf("day"));

      return row.accountGroup === activeFilter && matchesText; // Luôn lọc theo accountGroup trước khi tìm kiếm
    });

    setFilteredRows(filteredData);
  };

  const handleFilter = (filterType) => {
    setActiveFilter(filterType);

    const source = searchText.trim()
      ? filteredRows // nếu đang search → lọc trên kết quả search
      : rows; // chưa search → lọc trên toàn bộ dữ liệu

    let filteredData;

    if (filterType === "Tất cả") {
      filteredData = source;
    } else {
      // accountGroup là mảng → dùng includes
      filteredData = source.filter((row) => row.accountGroup.includes(filterType));
    }

    setFilteredRows(filteredData);
  };

  return (
    <div style={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2 item size={{ xs: 4, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label={tr(list.filter.search.label.key)}
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                sx={{ width: "100%" }}
                name={tr(list.filter.date.from.label.key)}
                label="Từ ngày"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                slotProps={{ textField: { size: "small", variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                sx={{ width: "100%" }}
                name="toDate"
                label={tr(list.filter.date.to.label.key)}
                value={toDate}
                onChange={(date) => setToDate(date)}
                slotProps={{ textField: { size: "small", variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 2 }}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <Search />
                </SvgIcon>
              }
              variant="contained"
              sx={{ backgroundColor: "neutral.main", color: "neutral.text" }}
              onClick={handleSearch}
            >
              {tr(list.filter.button.search.key)}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ margin: "10px 0 " }}>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Hệ thống" ? "neutral.main" : "#285AA9",
          }}
          onClick={() => handleFilter("Hệ thống")}
        >
          {tr(list.filter.accountTypeFilter.system.key)}
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Quản lý" ? "neutral.main" : "#285AA9",
          }}
          onClick={() => handleFilter("Quản lý")}
        >
          {tr(list.filter.accountTypeFilter.manager.key)}
        </BootstrapButton>
        <BootstrapButton
          size="small"
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Nhân viên" ? "neutral.text" : "#285AA9",
          }}
          onClick={() => handleFilter("Nhân viên")}
        >
          {tr(list.filter.accountTypeFilter.employee.key)}
        </BootstrapButton>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tất cả")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tất cả" ? "neutral.main" : "#285AA9",
          }}
        >
          {tr(list.filter.accountTypeFilter.all.key)}
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
      <AccountDetail
        open={isDialogDetailOpen}
        onClose={closeDialogDetail}
        rowData={selectedRow ? selectedRow : ""}
      />
      <AccountEditDialog
        listData={listData}
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        rowData={selectedRow ? selectedRow : ""}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
      <SystemAccessDialog
        open={dialogSystemAccessOpen}
        onClose={handleDialogSystemAccessClose}
        rowData={selectedRow ? selectedRow : ""}
      />
    </div>
  );
}
