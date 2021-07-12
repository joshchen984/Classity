import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LoggedInNav from '../../components/LoggedInNav';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: 757,
    margin: 'auto',
  },
  assignmentTypeButton: {
    borderRadius: '50em',
    margin: '1em 0',
  },
  addClassButton: {
    borderRadius: '50em',
  },
}));
const CreateClass = () => {
  const classes = useStyles();
  return (
    <>
      <LoggedInNav />
      <Grid container className={classes.main} direction="column">
        <Grid item>
          <Typography variant="h1">Add a Class</Typography>
        </Grid>
        <Grid item>
          <hr />
        </Grid>
        <Grid item>
          <TextField type="text" label="Class Name" required fullWidth />
        </Grid>
        <Grid item>
          <TextField type="text" label="Teacher Name" required fullWidth />
        </Grid>
        <Grid item>
          <Typography variant="h2">Grades</Typography>
        </Grid>
        <Grid container item spacing={3}>
          <Grid item xs={10}>
            <TextField type="text" label="Assignment Type" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <TextField type="text" label="% of Grade" fullWidth />
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Button
            variant="outlined"
            color="primary"
            className={classes.assignmentTypeButton}
          >
            Create Assignment Type
          </Button>
        </Grid>
        <Grid item container justify="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.addClassButton}
          >
            Add Class
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateClass;
