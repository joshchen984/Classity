import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoggedInNav from '../../components/LoggedInNav';
import CreateClassChart from '../../components/CreateClassChart';

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
  const [assignmentTypes, setAssignmentTypes] = useState<string[]>(['Total']);
  const [grades, setGrades] = useState<number[]>([100]);
  const [assignmentType, setAssignmentType] = useState<string>('');
  const [grade, setGrade] = useState<number>(100);

  const createAssignmentHandler = () => {
    const totalGrade = grades.reduce(
      (total: number, curGrade: number) => total + curGrade,
      0
    );
    if (totalGrade + grade <= 200) {
      setAssignmentTypes((prevState) => [assignmentType, ...prevState]);
      setGrades((prevState) => [grade, ...prevState]);
    }
  };
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
            <TextField
              type="text"
              label="Assignment Type"
              fullWidth
              value={assignmentType}
              onChange={(e) => setAssignmentType(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="% of Grade"
              fullWidth
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid item container justify="center">
          <Button
            variant="outlined"
            color="primary"
            className={classes.assignmentTypeButton}
            onClick={createAssignmentHandler}
          >
            Create Assignment Type
          </Button>
        </Grid>
        <Grid item>
          <CreateClassChart labels={assignmentTypes} grades={grades} />
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
