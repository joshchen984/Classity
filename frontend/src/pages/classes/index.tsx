import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { classDto } from '@classity/dto';
import withUserAuth from '../../hoc/withUserAuth';
import LoggedInNav from '../../components/LoggedInNav';
import { deleteApi, getApi } from '../../app/requestApi';
import ClassComponent from '../../components/Class';
import Layout from '../../components/Layout';
import ConfirmationDialog from '../../components/Dialogs/ConfirmationDialog';
import { gaEvent } from '../../app/gtag';

const tutorialOptions: React.ReactNode[] = [
  'Press the + icon in the top right to enter grades for a class.',
  'Any grades entered will be saved.',
];

type ClassesProps = {
  token: string;
};
const Classes = ({ token }: ClassesProps) => {
  const [userClasses, setUserClasses] = useState<classDto.Class[]>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // used by unenroll handler to decide which id to delete
  const [deletedClassId, setDeletedClassId] = useState<string>('');

  const getClasses = async () => {
    const response: classDto.Class[] = (await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/class`,
      token
    )) as unknown as classDto.Class[];
    setUserClasses(response);
  };
  useEffect(() => {
    if (token) {
      getClasses();
    }
  }, [token]);

  const unenrollHandler = async () => {
    await deleteApi(
      `${process.env.NEXT_PUBLIC_API_URL}/class/${deletedClassId}`,
      token
    );
    gaEvent('delete_class', {});
    setDeleteDialogOpen(false);
    await getClasses();
  };
  let userClassesComponents: JSX.Element | JSX.Element[] = (
    <Grid item>
      <ul>
        {tutorialOptions.map((option) => (
          <li key={option as string}>{option}</li>
        ))}
      </ul>
    </Grid>
  );
  if (userClasses && userClasses.length > 0) {
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
          unenrollHandler={() => {
            setDeletedClassId(userClass.id);
            setDeleteDialogOpen(true);
          }}
        />
      </Grid>
    ));
  }
  return (
    <>
      <Head>
        <title>Your Classes | Classity</title>
      </Head>
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={unenrollHandler}
        title="Delete Class?"
      />
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
