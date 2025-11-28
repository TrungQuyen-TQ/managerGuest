import React from "react";
import { Box, Typography, FormControlLabel, Switch } from "@mui/material";
import { inherits } from "util";

const CustomSwitch = ({ titleTypography, isChecked, onChange, labelFormControl = "" }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: "12px" }}>
      <Typography sx={{ ml: 1, minWidth: 170, fontWeight: 650 }}>{titleTypography}</Typography>
      <FormControlLabel
        sx={{
          alignItems: "flex-start",
          "& .MuiFormControlLabel-label": {
            color: "rgba(0, 0, 0, 0.54)",
            fontSize: "12px",
          },
          "& .MuiSwitch-switchBase": {
            color: "inherit", // lúc chưa checked
          },
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "blue", // lúc checked
          },
          "& .MuiSwitch-thumb": {
            backgroundColor: "black", // màu nút gạt
          },
          "& .MuiSwitch-track": {
            backgroundColor: "gray", // màu nền track
          },
        }}
        control={
          <Switch color="primary" sx={{ ml: "-10px" }} checked={isChecked} onChange={onChange} />
        }
        label={labelFormControl}
        labelPlacement="bottom"
      />
    </Box>
  );
};

export default CustomSwitch;
