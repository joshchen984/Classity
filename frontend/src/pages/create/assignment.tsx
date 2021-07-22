import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LoggedInNav from '../../components/LoggedInNav';
import withUserAuth from '../../hoc/withUserAuth';
import Layout from '../../components/Layout';

const Assignment = ({ token }) => {
  const [name, setName] = useState<string>('');
  return (
    <>
      <LoggedInNav />
      <Layout>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">Add Assignment</Typography>
          </Grid>
          <Grid item>
            <hr />
          </Grid>
          <Grid item>
            <TextField type="text" label="Assignment Name" required fullWidth />
          </Grid>
          <Grid item>
            <TextField type="text" label="Description" required fullWidth />
          </Grid>
          <Grid item>
            <TextField select label="Assignment Type" fullWidth>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={1}>Two</MenuItem>
              <MenuItem value={1}>Three</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default withUserAuth(Assignment, '/');
