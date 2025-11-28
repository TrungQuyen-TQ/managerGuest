import React from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  styled,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { maxWidth } from "@mui/system";

const CustomDialog = styled(Dialog)(({ theme, minWidth }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {},
  "& .MuiPaper-root": {
    minWidth: minWidth,
    maxWidth: "1500px",
  },
}));

export default function BootstrapDialog({
  open,
  onClose,
  minWidth,
  isFullScreen,
  title,
  children,
  actions = null,
}) {
  return (
    <CustomDialog open={open} onClose={onClose} minWidth={minWidth} fullScreen={isFullScreen}>
      <AppBar
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "neutral.main",
          color: "neutral.text",
          zIndex: 11,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>

          <IconButton
            aria-label="close"
            onClick={onClose}
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
        </Toolbar>
      </AppBar>
      {children}
      {actions && (
        <DialogActions
          sx={{
            position: "sticky",
            bottom: 0,
            right: 0,
            width: "100%",
            zIndex: 12,
            borderTop: "1px solid #eee",
            height: "60px",
            justifyContent: "flex-end",
            backgroundColor: "#e3e6e6",
          }}
        >
          {actions}
        </DialogActions>
      )}
    </CustomDialog>
  );
}
