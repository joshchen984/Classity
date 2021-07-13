import React, { useState } from 'react';
import axios from 'axios';
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
  const [classTitle, setClassTitle] = useState<string>('');
  const [teacher, setTeacher] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const createAssignmentHandler = () => {
    let isError = false;
    if (assignmentType === '') {
      isError = true;
      setError(true);
      setErrorMessage((prevState) => ({
        ...prevState,
        assignmentType: "Assignment Type can't be empty",
      }));
    }
    const totalGrade = grades.reduce(
      (total: number, curGrade: number) => total + curGrade,
      0
    );
    if (totalGrade + grade > 200) {
      isError = true;
      setError(true);
      setErrorMessage((prevState) => ({
        ...prevState,
        grade: "The total grade can't be over 100",
      }));
    }
    if (!isError) {
      setAssignmentTypes((prevState) => [assignmentType, ...prevState]);
      setGrades((prevState) => [grade, ...prevState]);
      setErrorMessage({});
    }
  };
  const createClassHandler = async () => {
    try {
      await axios.post('/api/class', {
        name: classTitle,
        teacher,
        assignmentTypes: assignmentTypes.map((assignmentType, i) => ({
          name: assignmentType,
          percentOfGrade: grades[i],
          currentGrade: grades[i],
        })),
      });
    } catch (e) {
      console.log(e);
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
          <TextField
            type="text"
            label="Class Name"
            required
            fullWidth
            onChange={(e) => setClassTitle(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            label="Teacher Name"
            required
            fullWidth
            onChange={(e) => setTeacher(e.target.value)}
          />
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
              error={!!errorMessage.assignmentType}
              helperText={errorMessage.assignmentType}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="% of Grade"
              fullWidth
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              error={!!errorMessage.grade}
              helperText={errorMessage.grade}
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
            onClick={createClassHandler}
          >
            Add Class
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateClass;
