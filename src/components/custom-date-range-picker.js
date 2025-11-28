import React from "react";
import { DateRangePicker } from "react-date-range";
import vi from "date-fns/locale/vi";
import { Popover } from "@mui/material";

const CustomDateRangePicker = ({ anchorEl, handleClose, stateDate, handleDateChange }) => {
  const open = Boolean(anchorEl);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <DateRangePicker
        locale={vi}
        onChange={(item) => handleDateChange(item)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={stateDate}
      />
    </Popover>
  );
};

export default CustomDateRangePicker;
