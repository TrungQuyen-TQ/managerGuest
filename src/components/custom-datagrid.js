import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CustomDataGrid = ({ rows, columns, additionalSx, ...props }) => {
  const enhancedColumns = columns.map((column) => ({
    ...column,
    headerClassName: column.headerClassName || "super-app-theme--header",
  }));

  return (
    <Box
      sx={{
        minWidth: 800,
        "& .super-app-theme--header": {
          backgroundColor: "#F8F9FA",
        },
        ...additionalSx,
      }}
    >
      <DataGrid
        rows={rows}
        columns={enhancedColumns}
        // getRowHeight={() => "auto"}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #ccc",
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              wordBreak: "break-word",
              textAlign: "center",
            },
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 30 },
          },
        }}
        pageSizeOptions={[30, 50]}
        disableRowSelectionOnClick
        {...props}
      />
    </Box>
  );
};

export default CustomDataGrid;
