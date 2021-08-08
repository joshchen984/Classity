import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { classDto } from '@classity/dto';
import withUserAuth from '../../hoc/withUserAuth';
import LoggedInNav from '../../components/LoggedInNav';
import { deleteApi, getApi } from '../../app/requestApi';
import ClassComponent from '../../components/Class';
import Layout from '../../components/Layout';

type ClassesProps = {
  token: string;
};
const Classes = ({ token }: ClassesProps) => {
  const [userClasses, setUserClasses] = useState<classDto.Class[]>();

  const getClasses = async () => {
    const response: classDto.Class[] = (await getApi(
      '/api/class',
      token
    )) as unknown as classDto.Class[];
    setUserClasses(response);
  };
  useEffect(() => {
    if (token) {
      getClasses();
    }
  }, [token]);

  const unenrollHandler = async (id: string) => {
    await deleteApi(`/api/class/${id}`, token);
    await getClasses();
  };
  let userClassesComponents = null;
  if (userClasses) {
    userClassesComponents = userClasses.map((userClass) => (
      <Grid item key={userClass.id}>
        <ClassComponent
          title={userClass.name}
          teacher={userClass.teacher}
          classLink={`/classes/${userClass.id}`}
          grade={userClass.grade}
          numGrades={
            userClass.assignments !== undefined
              ? userClass.assignments.length
              : 0
          }
          unenrollHandler={() => unenrollHandler(userClass.id)}
        />
      </Grid>
    ));
  }
  return (
    <>
      <LoggedInNav />
      <Layout>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">Classes</Typography>
          </Grid>
          <Grid item>
            <hr />
          </Grid>
          <Grid item container direction="column">
            {userClassesComponents}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default withUserAuth(Classes, '/');
