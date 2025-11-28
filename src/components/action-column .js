/* eslint-disable react/jsx-max-props-per-line */
import * as React from "react";
import { Tooltip, IconButton, MenuItem, Menu, styled, alpha } from "@mui/material";
import { Visibility, Edit, Delete, MoreVert, Lock } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../style/index.module.scss";
import { useState } from "react";
import { useModuleData } from "src/hooks/use-module-data";

const ActionColumn = ({
  handleViewDetail,
  openDialogEdit,
  params,
  buttonType = null,
  handleDelete,
}) => {
  const { data, tr } = useModuleData("common");

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isAlertLockDialogOpen, setIsAlertLockDialogOpen] = useState(false);

  //Style Opiton
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  if (!data) return null;
  const actionColumn = data.components.actionColumn;

  const handleOpenDelete = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsAlertDialogOpen(false);
  };

  const handleAgree = async () => {
    try {
      // Gọi hàm handleDelete khi người dùng xác nhận xóa
      await handleDelete(params.row);

      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error("Error :", error);
      // Xử lý lỗi nếu cần thiết
    }
  };

  const handleOpenLock = () => {
    setIsAlertLockDialogOpen(true);
  };

  const handleCloseLock = () => {
    setIsAlertLockDialogOpen(false);
  };

  const handleAgreeLock = async () => {
    try {
      await handleLock(params.row);

      setIsAlertLockDialogOpen(false);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
    },
  }));

  const renderButton = () => {
    if (buttonType === null) {
      // Nếu không có giá trị, hiển thị tất cả các nút
      return (
        <>
          <IconButton
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                handleViewDetail(params);
                handleClose();
              }}
              disableRipple
            >
              <Visibility />
              {tr(actionColumn.menu.detail.key)}
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                openDialogEdit(params);
                handleClose();
              }}
              disableRipple
            >
              <Edit />
              {tr(actionColumn.menu.edit.key)}
            </MenuItem>
            <MenuItem
              // sx={{ marginTop: "10px", borderTop: "1px solid #ccc" }}
              onClick={(event) => {
                event.stopPropagation();
                handleOpenDelete();
                handleClose();
              }}
              disableRipple
            >
              <Delete />
              {tr(actionColumn.menu.delete.key)}
            </MenuItem>
          </StyledMenu>
        </>
      );
    }

    // Nếu có giá trị, chỉ hiển thị nút tương ứng
    switch (buttonType) {
      case "view":
        return (
          <Tooltip title="Chi tiết">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleViewDetail(params);
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
        );
      case "edit":
        return (
          <Tooltip title="Sửa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                openDialogEdit(params);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        );
      case "delete":
        return (
          <Tooltip title="Xóa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleOpenDelete();
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        );
      case "lock":
        return (
          <Tooltip title="Khóa">
            <IconButton
              sx={{ color: "black" }}
              onClick={(event) => {
                event.stopPropagation();
                handleOpenLock();
              }}
            >
              <Lock />
            </IconButton>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {renderButton()}
      <ButtonDelete
        isAlertDialogOpen={isAlertDialogOpen}
        handleCloseDelete={handleCloseDelete}
        handleAgree={handleAgree}
      />
      <LockButton
        isAlertLockDialogOpen={isAlertLockDialogOpen}
        handleCloseLock={handleCloseLock}
        handleAgree={handleAgreeLock}
      />
    </div>
  );
};

export const ButtonDelete = ({ isAlertDialogOpen, handleCloseDelete, handleAgree }) => {
  const { data, tr } = useModuleData("common");
  if (!data) return null;
  const actionColumn = data.components.actionColumn;
  return (
    <Dialog
      open={isAlertDialogOpen}
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{tr(actionColumn.deleteConfirm.title.key)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ color: "red" }}>
          {tr(actionColumn.deleteConfirm.description.key)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className={styles.btn} onClick={handleCloseDelete}>
          {tr(actionColumn.deleteConfirm.button.cancel.key)}
        </Button>
        <Button className={styles.btn} onClick={handleAgree} autoFocus>
          {tr(actionColumn.deleteConfirm.button.delete.key)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const LockButton = ({ isAlertLockDialogOpen, handleCloseLock, handleAgree }) => {
  const { data, tr } = useModuleData("common");
  if (!data) return null;
  const actionColumn = data.components.actionColumn;
  return (
    <Dialog
      open={isAlertLockDialogOpen}
      onClose={handleCloseLock}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{tr(actionColumn.lockConfirm.title.key)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {tr(actionColumn.lockConfirm.description.key)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className={styles.btn} onClick={handleCloseLock}>
          {tr(actionColumn.lockConfirm.button.cancel.key)}
        </Button>
        <Button className={styles.btn} onClick={handleAgree} autoFocus>
          {tr(actionColumn.lockConfirm.button.confirm.key)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionColumn;
