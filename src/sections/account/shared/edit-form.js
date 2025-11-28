import { useState } from "react";

const { TabContext, TabList, TabPanel } = require("@mui/lab");
const { Stack, Box, Tab } = require("@mui/material");
const { default: TabInfoBasic } = require("../edit/tab-infobasic");
const { default: TabHealthCondition } = require("../edit/tab-healthcondition");
const { default: TabSystemAccess } = require("../edit/tab-systemAccess");
const { default: TabGeneralNotes } = require("../edit/tab-general-notes");
const { default: TabSecurity } = require("../edit/tab-security");

export default function EditForm({ formType }) {
  const [valueTab, setValueTab] = useState("1");

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  return (
    <Stack spacing={3} sx={{ p: 2 }}>
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
        <TabPanel value="1" sx={{ padding: "8px" }}>
          <TabSystemAccess />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: "8px" }}>
          <TabInfoBasic />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: "8px" }}>
          <TabHealthCondition />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: "8px" }}>
          <TabSecurity />
        </TabPanel>
        <TabPanel value="5" sx={{ padding: "8px" }}>
          <TabGeneralNotes />
        </TabPanel>
      </TabContext>
    </Stack>
  );
}
