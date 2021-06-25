/* eslint-disable arrow-body-style */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Login = () => {
  return (
    <Grid container>
      <Grid item>
        <form>
          <Grid container direction="column">
            <Grid item>
              <TextField label="Email" id="login-email" type="email" required />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                id="login-password"
                type="password"
                required
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">Log in</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
