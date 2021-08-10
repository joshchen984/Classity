/* eslint-disable no-shadow */
import React, { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { classDto } from '@classity/dto';
import LoggedInNav from '../../components/LoggedInNav';
import ClassChart from '../../components/ClassChart';
import { postApi } from '../../app/requestApi';
import withUserAuth from '../../hoc/withUserAuth';
import Layout from '../../components/Layout';
import Title from '../../components/Typography/Title';

type ErrorMessages = {
  classTitle: string;
  teacher: string;
  grade: string;
  assignmentType: string;
};
type ErrorMessageChanges = {
  classTitle?: string;
  teacher?: string;
  grade?: string;
  assignmentType?: string;
};
const useStyles = makeStyles(() => ({
  assignmentTypeButton: {
    borderRadius: '50em',
    margin: '1em 0',
  },
  addClassButton: {
    borderRadius: '50em',
  },
}));

type CreateClassProps = {
  token: string;
};
const CreateClass = ({ token }: CreateClassProps) => {
  const router = useRouter();
  const classes = useStyles();
  const [assignmentTypes, setAssignmentTypes] = useState<string[]>(['Total']);
  const [grades, setGrades] = useState<number[]>([100]);
  const [assignmentType, setAssignmentType] = useState<string>('');
  const [grade, setGrade] = useState<number>(100);
  const [classTitle, setClassTitle] = useState<string>('');
  const [teacher, setTeacher] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    classTitle: '',
    teacher: '',
    grade: '',
    assignmentType: '',
  });
  const setError = (errors: ErrorMessageChanges) => {
    setErrorMessages((prevState) => ({
      ...prevState,
      ...errors,
    }));
  };
  const createAssignmentHandler = () => {
    setError({ grade: '', assignmentType: '' });
    let isError = false;
    const totalGrade = grades.reduce(
      (total: number, curGrade: number) => total + curGrade,
      0
    );
    if (assignmentType === '') {
      isError = true;
      setError({ assignmentType: "Assignment Type can't be empty" });
    } else if (Number.isNaN(grade)) {
      isError = true;
      setError({ grade: 'The total grade has to be a number' });
    } else if (totalGrade + grade > 200) {
      isError = true;
      setError({ grade: "The total grade can't be over 100" });
    } else if (assignmentTypes.includes(assignmentType)) {
      isError = true;
      setError({ assignmentType: 'Assignment Type has to be unique' });
    }
    if (!isError) {
      setAssignmentTypes((prevState) => [assignmentType, ...prevState]);
      setGrades((prevState) => [grade, ...prevState]);
    }
  };
  const createClassHandler = async () => {
    setError({ grade: '', assignmentType: '', classTitle: '', teacher: '' });
    try {
      const totalGrade = grades.reduce(
        (total: number, curGrade: number) => total + curGrade,
        0
      );
      let error = false;
      if (classTitle === '') {
        error = true;
        setError({ classTitle: "Name can't be empty" });
      } else if (teacher === '') {
        error = true;
        setError({ teacher: "Teacher can't be empty" });
      } else if (totalGrade !== 200) {
        error = true;
        setError({ grade: 'The grades have to add up to 100%' });
      }
      if (!error) {
        const requestBody: classDto.CreateClassDto = {
          name: classTitle,
          teacher,
          assignmentTypes: assignmentTypes.map((assignmentType, i) => ({
            name: assignmentType,
            percentOfGrade: grades[i],
            currentGrade: grades[i],
            pointsReceived: 0,
            pointsWorth: 0,
          })),
        };
        requestBody.assignmentTypes = requestBody.assignmentTypes.filter(
          (assignType) => assignType.name !== 'Total'
        );
        await postApi('/api/class', requestBody, token);
        router.push('/classes');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
  return (
    <>
      <Head>
        <title>Create Class | Classity</title>
      </Head>
      <LoggedInNav />
      <Layout>
        <Grid container direction="column">
          <Title>Add a Class</Title>
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
              error={!!errorMessages.classTitle}
              helperText={errorMessages.classTitle}
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="Teacher Name"
              required
              fullWidth
              onChange={(e) => setTeacher(e.target.value)}
              error={!!errorMessages.teacher}
              helperText={errorMessages.teacher}
            />
          </Grid>
          <Grid item>
            <Typography variant="h2">Grades</Typography>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={8} sm={8} md={10}>
              <TextField
                type="text"
                label="Assignment Type"
                fullWidth
                value={assignmentType}
                onChange={(e) => setAssignmentType(e.target.value)}
                error={!!errorMessages.assignmentType}
                helperText={errorMessages.assignmentType}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <TextField
                type="number"
                label="% of Grade"
                fullWidth
                value={grade}
                onChange={(e) => setGrade(parseInt(e.target.value, 10))}
                error={!!errorMessages.grade}
                helperText={errorMessages.grade}
              />
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
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
            <ClassChart labels={assignmentTypes} grades={grades} />
          </Grid>
          <Grid item container justifyContent="center" alignItems="center">
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
      </Layout>
    </>
  );
};

export default withUserAuth(CreateClass, '/');
