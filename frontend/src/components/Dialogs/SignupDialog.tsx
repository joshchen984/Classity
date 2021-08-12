import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import validator from 'validator';
import firebaseClient from '../../auth/firebaseClient';
import AuthDialog from './AuthDialog';
import { postApi } from '../../app/requestApi';

type ErrorMessages = {
  email: string;
  password: string;
};
type ErrorMessageChanges = {
  email?: string;
  password?: string;
};
type SignupDialogProps = {
  open: boolean;
  onClose: () => void;
};
const SignupDialog = ({ open, onClose }: SignupDialogProps) => {
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
      } else if (password.length < 6) {
        setError({
          password: 'The password must be 6 characters long or more.',
        });
        error = true;
      }
      if (!error) {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (user) {
          const token: string = await user.getIdToken();
          await postApi(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
            { email },
            token
          );
        }
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError({ email: 'This email is already in use' });
      } else {
        throw error;
      }
    }
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
export default SignupDialog;
