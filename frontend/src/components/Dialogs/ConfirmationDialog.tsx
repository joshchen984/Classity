import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

type ConfirmationDialogProps = {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
};
const ConfirmationDialog = ({
  title,
  open,
  onClose,
  onConfirm,
}: ConfirmationDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
export default ConfirmationDialog;
