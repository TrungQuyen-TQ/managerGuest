import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import styles from "../style/index.module.scss";
import DialogContent from "@mui/material/DialogContent";
import BootstrapDialog from "./bootstrap-dialog";
import { useModuleData } from "src/hooks/use-module-data";

export default function ConfirmAlert({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  alert,
}) {
  const { data, tr } = useModuleData("common");
  if (!data) return null;
  const confirmAlert = data.components.confirmAlert;
  return (
    <BootstrapDialog
      onClose={onClose}
      open={open}
      minWidth="600px"
      title={tr(confirmAlert.titlePrefix.key) + title}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={alert ? { color: "red" } : undefined}>
          {tr(confirmAlert.messagePrefix.key) + title + tr(confirmAlert.messageSuffix.key)} <br />
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className={styles.btn} onClick={onCancel}>
          {tr(confirmAlert.button.cancel.key)}
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} autoFocus>
          {tr(confirmAlert.button.confirm.key)}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
