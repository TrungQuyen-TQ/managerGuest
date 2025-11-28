import React, { useState } from "react";
import { Box, IconButton, TextField, Tooltip, Button, DialogContent } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import BootstrapDialog from "src/components/bootstrap-dialog";
import { useEffect } from "react";

export default function AccountGroupAddDialog({ open, onClose, onAdd }) {
  const [newGroup, setNewGroup] = useState("");

  // Khi dialog mở thì reset input
  useEffect(() => {
    if (open) setNewGroup("");
  }, [open]);

  const handleConfirm = () => {
    if (newGroup.trim() !== "") {
      onAdd(newGroup.trim());
      onClose();
    }
  };

  return (
    <>
      {/* DIALOG NHẬP NHÓM */}
      <BootstrapDialog
        open={open}
        onClose={onClose}
        title="Thêm nhóm tài khoản mới"
        minWidth="400px"
        actions={
          <>
            <Button onClick={onClose} color="inherit">
              Hủy
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              disabled={!newGroup.trim()}
            >
              Xác nhận
            </Button>
          </>
        }
      >
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên nhóm mới"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            variant="outlined"
            size="small"
          />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
