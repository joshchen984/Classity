import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { classDto } from '@classity/dto';
import { format } from 'date-fns';
import LoggedInNav from '../../components/LoggedInNav';
import withUserAuth from '../../hoc/withUserAuth';
import Layout from '../../components/Layout';
import Circle from '../../components/Circle';
import ClassChart from '../../components/ClassChart';
import Assignment from '../../components/Assignment';
import CreateAssignmentDialog from '../../components/Dialogs/CreateAssignmentDialog';
import { deleteApi, getApi } from '../../app/requestApi';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '2rem',
  },
  typographyContainer: {
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
    },
  },
  assignmentHeader: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
  },
}));
type AssignmentsProps = {
  token: string;
};

const Assignments = ({ token }: AssignmentsProps) => {
  const [createAssignmentDialogOpen, setCreateAssignmentDialogOpen] =
    useState<boolean>(false);
  const [userClass, setUserClass] = useState<classDto.Class>();
  const assignmentTypeLabels: string[] | undefined = useMemo(
    () =>
      userClass?.assignmentTypes.map((element) => element.name).concat('Total'),
    [userClass?.assignmentTypes]
  );
  const assignmentTypeGrades: number[] | undefined = useMemo(
    () =>
      userClass?.assignmentTypes
        .map((element) => element.percentOfGrade)
        .concat(100),
    [userClass?.assignmentTypes]
  );
  const assignmentTypeCurrentGrades: number[] | undefined = useMemo(
    () =>
      userClass?.assignmentTypes
        .map((element) => element.currentGrade)
        .concat(userClass.grade),
    [userClass?.assignmentTypes]
  );
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const belowSm = useMediaQuery(theme.breakpoints.down('sm'));
  const classId = router.query.id as string;

  const getClass = async () => {
    const foundClass: classDto.Class = await getApi(
      `/api/class/${classId}`,
      token
    );
    setUserClass(foundClass);
  };
  const deleteAssignmentHandler = async (assignmentId: string) => {
    await deleteApi(`/api/assignment/${classId}/${assignmentId}`, token);
    await getClass();
  };

  const formatDate = (date: Date): string => {
    if (belowSm) {
      return format(date, 'MM/d/yy');
    }
    return format(date, 'MMMM d, y');
  };
  useEffect(() => {
    if (token) {
      getClass();
    }
  }, [token]);

  let assignments = null;
  if (userClass?.assignments !== undefined) {
    assignments = userClass.assignments.map((assignment) => (
      <Assignment
        title={assignment.name}
        description={assignment.description}
        gradeWorth={assignment.pointsWorth}
        gradeReceived={assignment.pointsReceived}
        assignmentType={assignment.type}
        deleteHandler={async () => deleteAssignmentHandler(assignment.id)}
        createdAt={formatDate(new Date(assignment.createdAt))}
        key={assignment.id}
      />
    ));
  }
  return (
    <>
      <LoggedInNav
        setCreateAssignmentDialogOpen={setCreateAssignmentDialogOpen}
      />
      <CreateAssignmentDialog
        open={createAssignmentDialogOpen}
        onClose={() => setCreateAssignmentDialogOpen(false)}
        getClass={getClass}
        assignmentTypes={userClass?.assignmentTypes}
        token={token}
        classId={classId}
      />
      <Layout>
        <Grid container direction="column">
          <Grid item className={classes.typographyContainer}>
            <Typography variant="h1" className={classes.title}>
              {userClass?.name}
            </Typography>
          </Grid>
          <Grid container item alignItems="center" className={classes.header}>
            <Grid item xs={12} sm={3}>
              <Circle size="large">
                {userClass ? `${userClass.grade.toFixed(2)}%` : 'N/A'}
              </Circle>
            </Grid>
            <Grid item xs={12} sm={9}>
              <ClassChart
                labels={assignmentTypeLabels}
                grades={assignmentTypeGrades}
                currentGrades={assignmentTypeCurrentGrades}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.typographyContainer}>
            <Typography variant="h2" className={classes.assignmentHeader}>
              Assignments
            </Typography>
          </Grid>
          <Grid item>
            <hr />
          </Grid>
          <Grid container item direction="column">
            {assignments}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default withUserAuth(Assignments, '/');
