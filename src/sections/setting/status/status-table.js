/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { useEffect } from "react";
import { useState } from "react";
import {
  findStatusByIdApi,
  listStatusApi,
  updateStatusApi,
} from "src/contexts/api/setting/api-status";
import StatusEdit from "./status-edit";
import BootstrapButton from "src/components/button-custom-filter";
import SnackbarAlert from "src/components/action-notification";
import { UnfoldMore } from "@mui/icons-material";

// Dữ liệu mẫu
const rows = [];

export default function StatusTable() {
  // state
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [filteredRows, setFilteredRows] = useState([]);
  const [dataWithSTT, setDataWithSTT] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [textAlertForNotify, setTextAlertForNotify] = useState("");
  // group objType
  const uniqueGroups = [
    ...new Set(Array.isArray(filteredRows) ? filteredRows.map((x) => x.objType) : []),
  ];
  const [visibleGroups, setVisibleGroups] = useState(uniqueGroups);

  useEffect(() => {
    // Khởi tạo trạng thái ban đầu khi component được render
    if (uniqueGroups) {
      setVisibleGroups(uniqueGroups);
    }
  }, [filteredRows]);

  useEffect(() => {
    const listData = async () => {
      const res = await listStatusApi();
    };
    listData();
  }, []);

  // áp dụng cả điều này cho search
  useEffect(() => {
    // Tính toán dataWithSTT trong useEffect để đảm bảo sử dụng dữ liệu mới nhất từ statuss
    const updatedDataWithSTT = Array.isArray(filteredRows)
      ? filteredRows.map((x, index) => ({
          ...x,
          stt: index + 1,
          id: x.id || index + 1,
        }))
      : [];

    setDataWithSTT(updatedDataWithSTT); // Cập nhật dataWithSTT vào state
    setFilteredRows(updatedDataWithSTT); // Cập nhật filteredRows khi statuss thay đổi
  }, []);

  //Detail
  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  //Edit
  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifiedByHidden: "1",
      };

      // dispatch({
      //     type: HANDLERS_STATUS.UPDATE_STATUS,
      //     payload: dataRowDelete,
      // });

      // Gọi hàm update
      const response = await updateStatusApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting market:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting market:", error);
    }
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "alias", headerName: "Alias", width: 150 },
    {
      field: "objType",
      headerName: "Loại",
      width: 130,
    },
    { field: "statusName", headerName: "Tên", width: 150 },
    { field: "description", headerName: "Ghi chú", width: 120 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
            handleDelete={() => handleDelete(params.row)}
          />
        </>
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  const handleFilter = (filterType) => {
    let filteredData = dataWithSTT;

    // Cập nhật trạng thái activeFilter khi người dùng chọn nút
    setActiveFilter(filterType);

    if (filterType === "Tất cả") {
      // Nếu là tất cả, hiển thị toàn bộ dữ liệu
      setFilteredRows(dataWithSTT);
    } else {
      // Ngược lại, lọc dữ liệu theo objType
      filteredData = dataWithSTT.filter((row) => row.objType === filterType);
      setFilteredRows(filteredData);
    }
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
    // Khi nhấn nút hiển thị tất cả, hãy hiển thị toàn bộ danh sách
    if (!showAll) {
      // Khi nhấn nút ẩn đi, chỉ hiển thị 3 nhóm đầu tiên
      setVisibleGroups(uniqueGroups.slice(0, 3));
    } else {
      setVisibleGroups(uniqueGroups);
    }
  };

  // phuc vu tim kiem
  const handleSearch = async () => {
    if (searchValue.length == 0) {
      setIsAlertDialogOpen(true);
      setTextAlertForNotify("Bạn phải nhập giá trị để tìm kiếm");
    } else {
      const result = await findStatusByIdApi(searchValue);

      if (result.data != "") {
        const data = [result.data];

        const rowsWithId = data.map((item, index) => ({
          ...item,
          stt: index + 1,
          id: new Date().valueOf(),
        }));

        setFilteredRows(rowsWithId);
      } else {
        setIsAlertDialogOpen(true);
        setTextAlertForNotify("Không tìm thấy kết quả");
      }
    }
  };

  // phuc vu tim kiem
  useEffect(() => {
    if (searchValue.length == 0) {
      setFilteredRows(dataWithSTT);
    }
  }, [searchValue]);

  const handleCloseAlert = async () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          size="small"
          label="Nhập tên trạng thái tìm kiếm"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "neutral.main",
            color: "neutral.text",
          }}
          size="small"
          variant="contained"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Box>
      <Box>
        <BootstrapButton
          size="small"
          onClick={() => handleFilter("Tất cả")}
          variant="contained"
          sx={{
            backgroundColor: activeFilter === "Tất cả" ? "neutral.main" : "#4b9949",
          }}
        >
          Tất cả
        </BootstrapButton>
        {visibleGroups.map((group, index) => (
          <span key={index}>
            <BootstrapButton
              size="small"
              onClick={() => handleFilter(group)}
              variant="contained"
              sx={{
                backgroundColor: activeFilter === group ? "neutral.main" : "#4b9949",
              }}
            >
              {group}
            </BootstrapButton>
          </span>
        ))}
        <Tooltip title={showAll ? "Hiển thị thêm" : "Ẩn bớt"} placement="top-start">
          <BootstrapButton
            size="small"
            variant="contained"
            onClick={handleToggleShowAll}
            sx={{
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                borderColor: "#f1f5f9",
                boxShadow: "none",
              },
              "&:focus": {
                boxShadow: "none",
                backgroundColor: "#f1f5f9",
              },
            }}
          >
            {showAll ? (
              <UnfoldMore sx={{ color: "black" }} />
            ) : (
              <UnfoldMore sx={{ color: "black" }} />
            )}
          </BootstrapButton>
        </Tooltip>
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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[20, 50]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <StatusEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.commonStatusId : ""}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
      {/*  alert when value search null */}
      <Dialog open={isAlertDialogOpen} onClose={handleCloseAlert}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>{textAlertForNotify}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
