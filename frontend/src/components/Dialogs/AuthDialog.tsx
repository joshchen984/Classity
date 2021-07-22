import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

type AuthDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  onSubmitHandler: () => void;
  children: React.ReactNode;
};
const AuthDialog = ({
  open,
  onClose,
  title,
  submitButtonText,
  onSubmitHandler,
  children,
}: AuthDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Grid container direction="column">
        {children}
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Cancel
      </Button>
      <Button color="primary" onClick={onSubmitHandler}>
        {submitButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);
export default AuthDialog;
