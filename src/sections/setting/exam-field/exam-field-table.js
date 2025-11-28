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
} from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ExamFieldTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do
    setIsModalDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  };

  const rows = [
    { id: 1, stt: 1, examField: "Tiếng Anh", description: "Ghi chú" },
    { id: 2, stt: 2, examField: "Tiếng Nhật", description: "Ghi chú 2" },
    { id: 4, stt: 4, examField: "Tin học", description: "Ghi chú 4" },
    { id: 5, stt: 5, examField: "Tiếng Hàn", description: "Ghi chú 5" },
    { id: 6, stt: 6, examField: "Lái xe", description: "Ghi chú 6" },
  ];

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "examField", headerName: "Tên lĩnh vực", width: 150 },
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ margin: "12px 0px", width: "55%" }}
            size="small"
            label="Nhập nội dung tìm kiếm"
            variant="outlined"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <DatePicker
              name="dob"
              slotProps={{
                textField: {
                  size: "small",
                  variant: "outlined",
                },
              }}
              label="Từ ngày"
              sx={{ marginRight: "12px", marginBottom: "10px" }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <DatePicker
              name="dob"
              // sx={{ marginLeft: "12px" }}
              slotProps={{
                textField: {
                  size: "small",
                  variant: "outlined",
                },
              }}
              label="Đến ngày"
            />
          </LocalizationProvider>
          <Button
            sx={{
              margin: "3px 0 20px 20px",
              backgroundColor: "neutral.main",
              color: "white",
            }}
            size="small"
            variant="contained"
          >
            Tìm kiếm
          </Button>
        </Box>
        <DataGrid
          rows={rows}
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
