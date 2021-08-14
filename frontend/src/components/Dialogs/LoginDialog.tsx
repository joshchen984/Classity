import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import validator from 'validator';
import firebaseClient from '../../auth/firebaseClient';
import AuthDialog from './AuthDialog';
import { gaEvent } from '../../app/gtag';

type ErrorMessages = {
  email: string;
  password: string;
};
type ErrorMessageChanges = {
  email?: string;
  password?: string;
};
type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};
const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  firebaseClient();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    email: '',
    password: '',
  });
  const setError = (errors: ErrorMessageChanges) => {
    setErrorMessages((prevState) => ({
      ...prevState,
      ...errors,
    }));
  };
  const onSubmitHandler = async () => {
    setErrorMessages({
      email: '',
      password: '',
    });
    try {
      let error = false;
      if (!validator.isEmail(email)) {
        setError({ email: 'The email address is badly formatted.' });
        error = true;
      } else if (password === '') {
        setError({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
        error = true;
      }
      if (!error) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        gaEvent('login', { method: 'Email Password' });
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
      } else if (error.code === 'auth/wrong-password') {
        setError({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
      } else {
        throw error;
      }
    }
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
          error={!!errorMessages.email}
          helperText={errorMessages.email}
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
          error={!!errorMessages.password}
          helperText={errorMessages.password}
        />
      </Grid>
    </AuthDialog>
  );
};

export default LoginDialog;
