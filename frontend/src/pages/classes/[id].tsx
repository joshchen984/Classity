import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Class } from '@classity/dto';
import LoggedInNav from '../../components/LoggedInNav';
import withUserAuth from '../../hoc/withUserAuth';
import Layout from '../../components/Layout';
import Circle from '../../components/Circle';
import ClassChart from '../../components/ClassChart';
import Assignment from '../../components/Assignment';
import CreateAssignmentDialog from '../../components/Dialogs/CreateAssignmentDialog';
import { getApi } from '../../app/requestApi';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '2rem',
  },
}));
type AssignmentsProps = {
  token: string;
};

const Assignments = ({ token }: AssignmentsProps) => {
  const [createAssignmentDialogOpen, setCreateAssignmentDialogOpen] =
    useState<boolean>(false);
  const [userClass, setUserClass] = useState<Class>();
  const classes = useStyles();
  const router = useRouter();
  const classId = router.query.id;

  useEffect(() => {
    const getClass = async () => {
      const foundClass: Class = await getApi(`/api/class/${classId}`, token);
      setUserClass(foundClass);
    };
    if (token) {
      getClass();
    }
  }, [token]);
  return (
    <>
      <LoggedInNav
        setCreateAssignmentDialogOpen={setCreateAssignmentDialogOpen}
      />
      <CreateAssignmentDialog
        open={createAssignmentDialogOpen}
        onClose={() => setCreateAssignmentDialogOpen(false)}
        assignmentTypes={userClass?.assignmentTypes}
      />
      <Layout>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">Title</Typography>
          </Grid>
          <Grid container item alignItems="center" className={classes.header}>
            <Grid item md={3}>
              <Circle size="large">60%</Circle>
            </Grid>
            <Grid item md={9}>
              <ClassChart
                labels={['Homework', 'Tests', 'Total']}
                grades={[40, 60, 100]}
                currentGrades={[35, 50, 50]}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h2">Assignments</Typography>
          </Grid>
          <Grid item>
            <hr />
          </Grid>
          <Grid container item direction="column">
            <Assignment
              title="Redux Project"
              description="This is a big science project"
              gradeWorth={100}
              gradeRecieved={95}
              assignmentType="Project"
              deleteHandler={() => null}
            />
            <Assignment
              title="Redux Project"
              description="This is a big science project"
              gradeWorth={100}
              gradeRecieved={95}
              assignmentType="Project"
              deleteHandler={() => null}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default withUserAuth(Assignments, '/');
