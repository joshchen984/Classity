import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseClient from '../auth/firebaseClient';
import AuthDialog from './AuthDialog';

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
    <AuthDialog
      open={open}
      onClose={onClose}
      title="Log in"
      submitButtonText="Log in"
      onSubmitHandler={onSubmitHandler}
    >
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
    </AuthDialog>
  );
};

export default LoginDialog;
