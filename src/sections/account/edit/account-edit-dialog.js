import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Tab, AppBar, DialogContent } from "@mui/material";
import { actionSetTouched, validateFieldInfobasic } from "./tab-infobasic";
import { validateFieldHealthCondition } from "./tab-healthcondition";
import { validateFieldAccessSystem } from "./tab-systemAccess";
import SnackbarAlert from "src/components/action-notification";
import { updateEmployeeApi } from "src/contexts/api/company/api-employee";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTabs } from "src/slices/account/accountSelector";
import EditForm from "../shared/edit-form";
import { setValuesForEditAccountsAsync } from "src/slices/account/account";
import BootstrapDialog from "src/components/bootstrap-dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountEditDialog({ listData, open, onClose, rowData }) {
  const dispatch = useDispatch();
  const account = useSelector(selectAllTabs);
  const { basicInfo, healthCondition, accessSystem, generalNotes } = account;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  console.log(rowData);
  useEffect(() => {
    const fetchData = () => {
      dispatch(setValuesForEditAccountsAsync(rowData));
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có rowData
    if (open && rowData) {
      fetchData();
    }
  }, [open, rowData]);

  const handleClose = (isEvent) => {
    onClose(isEvent);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAdd = async () => {
    Object.keys(basicInfo)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "basicInfo", fieldName);
        validateFieldInfobasic(dispatch, "basicInfo", fieldName, basicInfo[fieldName]);
      });

    Object.keys(healthCondition)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "healthCondition", fieldName);
        validateFieldHealthCondition(
          dispatch,
          "healthCondition",
          fieldName,
          healthCondition[fieldName]
        );
      });

    Object.keys(accessSystem)
      .slice(0, -2)
      .forEach((fieldName) => {
        actionSetTouched(dispatch, "accessSystem", fieldName);
        validateFieldAccessSystem(dispatch, "accessSystem", fieldName, accessSystem[fieldName]);
      });

    const noErrors =
      Object.values(basicInfo.errors).every((error) => error === null) &&
      Object.values(accessSystem.errors).every((error) => error === null) &&
      Object.values(healthCondition.errors).every((error) => error === null);
    console.log(Object.values(basicInfo.errors).map((error) => error));
    console.log(Object.values(accessSystem.errors).map((error) => error));
    console.log(Object.values(healthCondition.errors).map((error) => error));

    if (noErrors) {
      try {
        const response = await updateEmployeeApi(employee);
        if (response.status === 200) {
          listData();
          handleClose(true);
        } else {
          console.log(response);
          setSnackbarSeverity("error");
          setSnackbarMessage("Đã xảy ra lỗi khi gửi dữ liệu!");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.log(error);
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại!");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={() => handleClose(false)}
      title="Sửa thông tin"
      minWidth="100%"
      isFullScreen
      actions={
        <>
          <Button onClick={() => handleClose(false)} color="inherit">
            Hủy
          </Button>
          <Button autoFocus color="inherit" onClick={handleAdd}>
            Lưu
          </Button>
        </>
      }
    >
      <DialogContent>
        <EditForm formType="dialog" />
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </DialogContent>
    </BootstrapDialog>
  );
}
