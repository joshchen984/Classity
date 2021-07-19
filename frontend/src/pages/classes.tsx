import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Class } from 'classity-dto';
import { makeStyles } from '@material-ui/core/styles';
import withUserAuth from '../hoc/withUserAuth';
import LoggedInNav from '../components/LoggedInNav';
import { getApi } from '../app/requestApi';
import ClassComponent from '../components/Class';

const useStyles = makeStyles((theme) => ({
  main: {
    maxWidth: 757,
    margin: 'auto',
  },
}));
type ClassesProps = {
  token: string;
};
const Classes = ({ token }: ClassesProps) => {
  const classes = useStyles();
  const [userClasses, setUserClasses] = useState<Class[]>();
  useEffect(() => {
    const getClasses = async () => {
      const response: Class[] = (await getApi(
        '/api/class',
        token
      )) as unknown as Class[];
      setUserClasses(response);
    };
    if (token) {
      getClasses();
    }
  }, [token]);
  return (
    <>
      <LoggedInNav />
      <Grid container direction="column" className={classes.main}>
        <Grid item>
          <Typography variant="h1">Classes</Typography>
        </Grid>
        <Grid item>
          <hr />
        </Grid>
        <Grid item>
          {userClasses?.map((userClass) => (
            <ClassComponent
              title={userClass.name}
              teacher={userClass.teacher}
              classLink={'/classes/3'}
              grade={
                userClass.assignmentTypes[userClass.assignmentTypes.length - 1]
                  .currentGrade
              }
              numGrades={5}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default withUserAuth(Classes, '/');
