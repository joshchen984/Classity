import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseClient from '../firebaseClient';
import AuthDialog from './AuthDialog';

type SignupDialogProps = {
  open: boolean;
  onClose: () => void;
};
const SignupDialog = ({ open, onClose }: SignupDialogProps) => {
  firebaseClient();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onSubmitHandler = async () => {
    // TODO: Set up error handling
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };
  return (
    <AuthDialog
      open={open}
      onClose={onClose}
      title="Sign up"
      submitButtonText="Sign up"
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
export default SignupDialog;
