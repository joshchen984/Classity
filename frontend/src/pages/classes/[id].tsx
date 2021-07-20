import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LoggedInNav from '../../components/LoggedInNav';
import withUserAuth from '../../hoc/withUserAuth';
import Layout from '../../components/Layout';
import Circle from '../../components/Circle';
import ClassChart from '../../components/ClassChart';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '2rem',
  },
}));
type AssignmentsProps = {
  token: string;
};

const Assignments = ({ token }: AssignmentsProps) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <LoggedInNav />
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
        </Grid>
      </Layout>
    </>
  );
};

export default withUserAuth(Assignments, '/');
