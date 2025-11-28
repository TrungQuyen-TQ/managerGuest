import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import styles from '../style/index.module.scss';
import DialogContent from '@mui/material/DialogContent';

export default function EditConfirmAlert({ onOpen, onClose, onConfirm, onCancel }) {

  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Dialog
          open={onOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xác nhận lưu</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có chắc chắn muốn lưu không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={styles.btn} onClick={onCancel}> Hủy </Button>
            <Button className={styles.btn} onClick={onConfirm} autoFocus> Đồng ý </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}