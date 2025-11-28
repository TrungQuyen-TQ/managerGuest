import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabInfoBasic from "./tab-infobasic";
import HealthConditionEmployee from "./tab-healthcondition";
import TabSystemAccess from "./tab-systemAccess";
import TabGeneralNotes from "./tab-general-notes";
import TabSecurity from "./tab-security";
import { useModuleData } from "src/hooks/use-module-data";

export default function AccountAdd({ isSuccess, setSuccess }) {
  const [valueTab, setValueTab] = useState("1");
  const { data, tr } = useModuleData("system/account");

  if (!data) return null;
  const tab = data.pages.add.tabs;

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <>
      <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", minHeight: "95.9vh" }}>
        <TabContext value={valueTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label={tr(tab.systemAccess.label.key)} value="1" />
              <Tab label={tr(tab.infoBasic.label.key)} value="2" />
              <Tab label={tr(tab.healthCondition.label.key)} value="3" />
              <Tab label={tr(tab.security.label.key)} value="4" />
              <Tab label={tr(tab.generalNotes.label.key)} value="5" />
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
            <TabInfoBasic isSuccess={isSuccess} setIsSuccess={setSuccess} />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{
              marginTop: "0px !important",
              padding: "8px",
            }}
          >
            <HealthConditionEmployee />
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
      </Paper>
    </>
  );
}
