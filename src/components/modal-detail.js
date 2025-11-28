import React from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  Grid2,
  Stack,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogActions,
  styled,
  DialogTitle,
  DialogContent,
  Avatar,
} from "@mui/material";
import InfoRecord from "./info-record";
import { format } from "date-fns";
import { useModuleData } from "src/hooks/use-module-data";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    minWidth: "700px",
  },
}));

export default function ModalDetail({
  open,
  onClose,
  rowData,
  columns,
  typeDateTime = null,
  dateTimeFields = null,
}) {
  const { data, tr } = useModuleData("common");

  if (!data) return null;
  const modalDetail = data.components.modalDetail;

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    onClose();
  };

  const isImage = (value) => {
    // Kiểm tra xem giá trị có phải là một đường dẫn hình ảnh hay không
    return (
      typeof value === "string" &&
      (value.endsWith(".png") ||
        value.endsWith(".jpg") ||
        value.endsWith(".jpeg") ||
        value.endsWith(".gif") ||
        value.endsWith(".bmp"))
    );
  };

  const formatDate = (value, fieldName) => {
    if (dateTimeFields && dateTimeFields[fieldName] && typeDateTime[fieldName]) {
      return format(new Date(value), typeDateTime[fieldName]);
    }
    return value;
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "neutral.main", color: "white" }}>
        {tr(modalDetail.title.key)}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <SvgIcon fontSize="inherit">
          <XCircleIcon />
        </SvgIcon>
      </IconButton>
      <DialogContent dividers>
        <Stack sx={{ p: 2 }}>
          {columns
            .filter((column) => column.field && column.field !== "stt" && column.field !== "action")
            .map((column) => (
              <Grid2 container spacing={2} key={column.field} sx={{ marginBottom: 2 }}>
                <Grid2 item size={6}>
                  <Typography variant="body1">
                    <strong>{column.headerName}:</strong>
                  </Typography>
                </Grid2>
                <Grid2 item size={6}>
                  {rowData && column.field && (
                    <>
                      <Typography
                        variant="body1"
                        sx={{
                          wordWrap: "break-word",
                        }}
                      >
                        {formatDate(rowData[column.field], column.field)}
                      </Typography>
                      {/* )} */}
                    </>
                  )}
                </Grid2>
              </Grid2>
            ))}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#e3e6e6",
        }}
      >
        <InfoRecord />
        <Button
          autoFocus
          onClick={handleAdd}
          variant="contained"
          sx={{ background: "neutral.main" }}
        >
          {tr(modalDetail.close.key)}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
