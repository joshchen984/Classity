import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseClient from '../firebaseClient';

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};
const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  firebaseClient();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onSubmitHandler = async () => {
    // TODO: Set up error handling
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Log in</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Email"
              id="login-email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              id="login-password"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSubmitHandler}>Log in</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
