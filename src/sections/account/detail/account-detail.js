import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Tab, AppBar, Paper, DialogContent } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TabInfoBasic from "./tab-infobasic";
import TabGeneralNotes from "./tab-general-notes";
import TabSecurity from "./tab-security";
import TabSystemAccess from "./tab-systemAccess";
import TabHealthCondition from "./tab-healthcondition";
import BootstrapDialog from "src/components/bootstrap-dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AccountDetail({ open, onClose, rowData }) {
  const [valueTab, setValueTab] = useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    onClose();
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      title="Chi tiết"
      isFullScreen={true}
      minWidth="100%"
    >
      <DialogContent>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Truy cập hệ thống" value="1" />
              <Tab label="Thông tin cơ bản" value="2" />
              <Tab label="Tình trạng sức khỏe" value="3" />
              <Tab label="Bảo mật" value="4" />
              <Tab label="Ghi chú chung" value="5" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabSystemAccess />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabInfoBasic />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabHealthCondition />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabSecurity />
          </TabPanel>
          <TabPanel
            value="5"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <TabGeneralNotes />
          </TabPanel>
        </TabContext>
      </DialogContent>
    </BootstrapDialog>
  );
}
