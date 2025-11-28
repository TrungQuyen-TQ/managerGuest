import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import ActionColumn from "src/components/action-column ";
import EducationLevelEdit from "./educationLevel-edit";
import ModalDetail from "src/components/modal-detail";
import styles from "../../../style/index.module.scss";
import SnackbarAlert from "src/components/action-notification";
import {
  editEducationLevelApi,
  listEducationLevelApi,
} from "src/contexts/api/setting/api-educationlevel";

export default function EducationLevelTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const listData = async () => {
    try {
      const res = await listEducationLevelApi();
      // dispatch({
      //   type: HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL,
      //   payload: res.data || [],
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    listData();
  }, []);

  const dataEducation = [];

  //Function event Delete
  const handleDelete = async (row) => {
    try {
      const dataRowDelete = {
        ...row,
        flag: "D",
        CreatedByHidden: "1",
        LastModifiedByHidden: "1",
      };

      // dispatch({
      //   type: HANDLERS_EDUCATIONLEVEL.UPDATE_EDUCATIONLEVEL,
      //   payload: dataRowDelete,
      // });

      // Gọi hàm update
      const response = await editEducationLevelApi(dataRowDelete);

      if (response.status !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Đã có lỗi xảy ra!");
        setSnackbarOpen(true);
        console.error("Error deleting:", response);
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage("Đã xóa thành công!");
        setSnackbarOpen(true);
        listData();
      }
    } catch (error) {
      console.error("Error deleting:", error);
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
    { field: "code", headerName: "Mã Trình Độ Văn Hóa", width: 200 },
    { field: "name", headerName: "Tên Trình Độ Văn Hóa", width: 200 },
    { field: "description", headerName: "Mô Tả Chi Tiết", width: 200 },
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
        <Button className={styles.btn} size="small" variant="contained">
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={dataEducation}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #ccc ",
            backgroundColor: "#f0f0f0",
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
      <EducationLevelEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.educationLevelId : ""}
      />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
