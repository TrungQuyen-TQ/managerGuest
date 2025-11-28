import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Tab, AppBar } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import InfoBaseEmployee, { actionSetTouched, validateFieldInfobasic } from "./tab-infobasic";
import HealthConditionEmployee, { validateFieldHealthCondition } from "./tab-healthcondition";
import AccessSystemEmployee, { validateFieldAccessSystem } from "./tab-systemAccess";
import TabGeneralNotes from "./tab-general-notes";
import SnackbarAlert from "src/components/action-notification";
import { listEmployeeApi, updateEmployeeApi } from "src/contexts/api/company/api-employee";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTabs } from "src/slices/account/accountSelector";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountEdit({ listData, open, onClose, rowData }) {
  const [valueTab, setValueTab] = useState("1");
  const dispatch = useDispatch();
  const user = useSelector(selectAllTabs);
  const { basicInfo, healthCondition, accessSystem, generalNotes } = user;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  console.log(rowData);
  useEffect(() => {
    const fetchData = () => {
      dispatch(setValuesForEditUsersAsync(rowData));
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có rowData
    if (open && rowData) {
      fetchData();
    }
  }, [open, rowData]);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

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
    <Dialog
      fullScreen
      open={open}
      onClose={() => handleClose(false)}
      TransitionComponent={Transition}
      // PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "fixed", backgroundColor: "neutral.main" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose(false)}
            aria-label="close"
          >
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <Button autoFocus color="inherit" onClick={handleAdd}>
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Thông tin cơ bản" value="1" />
              <Tab label="Tình trạng sức khỏe" value="2" />
              <Tab label="Thay đổi mật khẩu" value="3" />
              <Tab label="Ghi chú chung" value="4" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <InfoBaseEmployee rowData={rowData} />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <HealthConditionEmployee rowData={rowData} />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <AccessSystemEmployee rowData={rowData} />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabGeneralNotes rowData={rowData} />
          </TabPanel>
        </TabContext>
      </Stack>
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Dialog>
  );
}
