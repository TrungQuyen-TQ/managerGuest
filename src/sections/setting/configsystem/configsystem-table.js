import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import ActionColumn from "src/components/action-column ";
import SystemEdit from "./configsystem-edit";
import ModalDetail from "src/components/modal-detail";
import styles from "../../../style/index.module.scss";
import {
  editConfigSystemApi,
  listConfigSystemApi,
} from "src/contexts/api/setting/api-configsystem";

const rows = [];

export default function MarketTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const listData = async () => {
    try {
      const res = await listConfigSystemApi();
      // dispatch({
      //   type: HANDLERS_CONFIGSYSTEM.LIST_CONFIGSYSTEM,
      //   payload: res.data || [],
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    listData();
  }, []);

  const dataConfigSystem = [];

  // Function event Delete
  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifiedByHidden: "1",
      };

      // dispatch({
      //   type: HANDLERS_CONFIGSYSTEM.UPDATE_CONFIGSYSTEM,
      //   payload: dataRowDelete,
      // });

      // Gọi hàm update
      const response = await editConfigSystemApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting configsystem:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
        listData();
      }
    } catch (error) {
      console.error("Error deleting configsystem:", error);
    }
  };

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

  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "configName", headerName: "Tên Cấu Hình", width: 130 },
    { field: "configAlias", headerName: "Alias", width: 130 },
    { field: "configKey", headerName: "Key", width: 130 },
    {
      field: "configValue",
      headerName: "Value",
      width: 90,
    },
    {
      field: "configGroup",
      headerName: "Group",
      width: 160,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 160,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={openDialogEdit}
          params={params}
          buttonType={null}
          handleDelete={() => handleDelete(params.row)}
        />
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          variant="outlined"
          size="small"
          label="Nhập nội dung tìm kiếm"
        />
        <Button
          size="small"
          variant="contained"
          sx={{
            ml: "5px",
            backgroundColor: "neutral.main",
            color: "neutral.text",
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={dataConfigSystem}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
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
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <SystemEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.configSystemId : null}
      />
    </>
  );
}
